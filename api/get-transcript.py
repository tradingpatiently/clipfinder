from http.server import BaseHTTPRequestHandler
import json
import re
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import (
    TranscriptsDisabled,
    NoTranscriptFound,
    VideoUnavailable,
)


def extract_video_id(url):
    patterns = [
        r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})',
        r'youtube\.com\/embed\/([a-zA-Z0-9_-]{11})',
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None


def format_timestamp(seconds):
    seconds = int(seconds)
    h = seconds // 3600
    m = (seconds % 3600) // 60
    s = seconds % 60
    if h > 0:
        return f"{h}:{m:02d}:{s:02d}"
    return f"{m}:{s:02d}"


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            data = json.loads(body) if body else {}
            video_url = data.get('url', '')

            video_id = extract_video_id(video_url)
            if not video_id:
                self._send_json(400, {'error': "Couldn't parse a YouTube video ID from that URL."})
                return

            ytt_api = YouTubeTranscriptApi()

            try:
                transcript_list = ytt_api.list(video_id)
                # Prefer English, but fall back to whatever's available (manual or auto-generated)
                try:
                    transcript = transcript_list.find_transcript(['en'])
                except NoTranscriptFound:
                    transcript = next(iter(transcript_list), None)
                    if transcript is None:
                        raise NoTranscriptFound(video_id, ['en'], transcript_list)

                fetched = transcript.fetch()

            except TranscriptsDisabled:
                self._send_json(422, {
                    'error': 'Captions are disabled for this video. Make sure auto-captions are turned on in YouTube Studio, or wait a bit longer after upload — captions usually appear within an hour.'
                })
                return
            except NoTranscriptFound:
                self._send_json(422, {
                    'error': 'No transcript is available yet for this video. Auto-captions usually appear within an hour of upload — try again shortly.'
                })
                return
            except VideoUnavailable:
                self._send_json(422, {
                    'error': 'This video is unavailable or private. Make sure the link is correct and the video is public or unlisted.'
                })
                return

            # Build a timestamped transcript string, same format the rest of the app expects
            lines = []
            for entry in fetched:
                ts = format_timestamp(entry.start)
                text = entry.text.strip().replace('\n', ' ')
                if text:
                    lines.append(f"[{ts}] {text}")

            transcript_text = '\n'.join(lines)

            if len(transcript_text) < 100:
                self._send_json(422, {'error': 'Transcript was too short or empty. Try again once captions have fully processed.'})
                return

            self._send_json(200, {'transcript': transcript_text, 'video_id': video_id})

        except Exception as e:
            self._send_json(500, {'error': str(e) or 'Server error while fetching transcript.'})

    def _send_json(self, status, payload):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)
