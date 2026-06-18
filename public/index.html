<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Trading Patiently — Clip Finder</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #080a0c; color: #e8e8e8; font-family: 'DM Mono', monospace; min-height: 100vh; }
    .app { max-width: 780px; margin: 0 auto; padding: 40px 20px 80px; }

    .header { margin-bottom: 40px; }
    .header-eyebrow { font-size: 11px; letter-spacing: 0.25em; color: #00ff87; text-transform: uppercase; margin-bottom: 8px; }
    .header-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(42px, 8vw, 72px); line-height: 0.9; letter-spacing: 0.02em; color: #fff; }
    .header-title span { color: #00ff87; }
    .header-sub { margin-top: 12px; font-size: 13px; color: #666; line-height: 1.6; }

    .section { margin-bottom: 24px; }
    .field-label { font-size: 10px; letter-spacing: 0.2em; color: #555; text-transform: uppercase; margin-bottom: 8px; }

    /* TABS */
    .tabs { display: flex; gap: 8px; margin-bottom: 20px; }
    .tab-btn { flex: 1; background: #0e1114; border: 1px solid #1e2328; color: #666; border-radius: 4px; padding: 12px; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
    .tab-btn.active { border-color: #00ff87; color: #00ff87; background: #0e1114; }
    .tab-btn:hover:not(.active) { border-color: #333; color: #999; }

    /* DROPZONE */
    .dropzone { background: #0e1114; border: 2px dashed #1e2328; border-radius: 6px; padding: 40px 20px; text-align: center; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
    .dropzone:hover, .dropzone.dragover { border-color: #00ff87; background: #0f1612; }
    .dropzone-icon { font-size: 32px; margin-bottom: 12px; opacity: 0.6; }
    .dropzone-text { font-size: 13px; color: #888; margin-bottom: 4px; }
    .dropzone-sub { font-size: 11px; color: #444; }
    .file-input { display: none; }

    .file-selected { background: #0e1114; border: 1px solid #00ff8744; border-radius: 6px; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .file-selected-info { display: flex; align-items: center; gap: 12px; min-width: 0; }
    .file-icon { font-size: 20px; flex-shrink: 0; }
    .file-name { font-size: 13px; color: #e8e8e8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .file-size { font-size: 11px; color: #555; margin-top: 2px; }
    .file-remove { background: transparent; border: 1px solid #1e2328; color: #888; border-radius: 4px; padding: 6px 12px; font-family: 'DM Mono', monospace; font-size: 11px; cursor: pointer; flex-shrink: 0; }
    .file-remove:hover { border-color: #ff6b6b; color: #ff6b6b; }

    .how-to { background: #0a0d10; border: 1px solid #1a1f24; border-radius: 4px; padding: 14px 16px; margin-bottom: 10px; }
    .how-to-title { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #555; margin-bottom: 10px; }
    .how-to ol { padding-left: 16px; }
    .how-to li { font-size: 12px; color: #555; line-height: 1.9; }
    .how-to li span { color: #00ff87; }

    .transcript-box { width: 100%; background: #0e1114; border: 1px solid #1e2328; border-radius: 4px; padding: 14px 16px; font-family: 'DM Mono', monospace; font-size: 12px; color: #e8e8e8; outline: none; transition: border-color 0.2s; resize: vertical; min-height: 180px; line-height: 1.6; }
    .transcript-box:focus { border-color: #00ff87; }
    .transcript-box::placeholder { color: #333; }
    .char-count { font-size: 10px; color: #444; margin-top: 6px; letter-spacing: 0.1em; }
    .char-count.ok { color: #00ff87; }

    .analyze-btn { background: #00ff87; color: #080a0c; border: none; border-radius: 4px; padding: 16px 24px; font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 0.08em; cursor: pointer; width: 100%; margin-top: 8px; transition: opacity 0.2s, transform 0.1s; }
    .analyze-btn:hover:not(:disabled) { opacity: 0.85; }
    .analyze-btn:active:not(:disabled) { transform: scale(0.99); }
    .analyze-btn:disabled { opacity: 0.3; cursor: not-allowed; }

    .loading-state { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 50px 0; }
    .loading-bar { width: 240px; height: 4px; background: #1a1f24; border-radius: 2px; overflow: hidden; position: relative; }
    .loading-bar-fill { height: 100%; background: #00ff87; border-radius: 2px; transition: width 0.3s ease; }
    .loading-bar-fill.indeterminate { width: 40% !important; animation: loadSlide 1.4s ease-in-out infinite; position: absolute; }
    @keyframes loadSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }
    .loading-label { font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: #888; }
    .loading-step { font-size: 11px; color: #444; letter-spacing: 0.05em; max-width: 320px; text-align: center; line-height: 1.6; }
    .loading-pct { font-size: 11px; color: #00ff87; letter-spacing: 0.1em; }

    .error-box { background: #1a0a0a; border: 1px solid #ff3b3b44; border-radius: 4px; padding: 16px; color: #ff6b6b; font-size: 13px; line-height: 1.6; margin-top: 24px; }
    .warn-box { background: #1a1508; border: 1px solid #ffd70044; border-radius: 4px; padding: 14px 16px; color: #ffd700; font-size: 12px; line-height: 1.6; margin-top: 16px; }

    .results-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
    .st-label { font-size: 10px; letter-spacing: 0.2em; color: #555; text-transform: uppercase; margin-bottom: 4px; }
    .st-value { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #fff; letter-spacing: 0.04em; }
    .export-btn { background: transparent; border: 1px solid #1e2328; color: #888; border-radius: 4px; padding: 10px 16px; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: border-color 0.2s, color 0.2s; white-space: nowrap; }
    .export-btn:hover { border-color: #00ff87; color: #00ff87; }

    .clips-grid { display: flex; flex-direction: column; gap: 16px; }
    .clip-card { background: #0e1114; border: 1px solid #1e2328; border-radius: 6px; padding: 20px; transition: border-color 0.2s; position: relative; }
    .clip-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; border-radius: 6px 0 0 6px; background: var(--accent, #00ff87); }
    .clip-card:hover { border-color: var(--accent, #00ff87); }
    .clip-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
    .clip-index { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: #333; letter-spacing: 0.05em; min-width: 32px; }
    .clip-badge { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; border: 1px solid; border-radius: 3px; padding: 3px 8px; opacity: 0.85; }
    .clip-viral-score { margin-left: auto; display: flex; align-items: center; gap: 6px; }
    .viral-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #444; }
    .viral-value { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.02em; }
    .clip-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 0.04em; color: #fff; margin-bottom: 8px; line-height: 1.1; }
    .clip-why { font-size: 12px; color: #666; line-height: 1.6; margin-bottom: 16px; }
    .clip-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
    .clip-timestamp { display: flex; align-items: center; gap: 8px; font-size: 11px; }
    .ts-label { color: #444; letter-spacing: 0.12em; text-transform: uppercase; }
    .ts-value { font-size: 14px; font-weight: 500; }
    .ts-sep { color: #333; }
    .copy-btn { background: transparent; border: 1px solid; border-radius: 3px; padding: 6px 12px; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; cursor: pointer; transition: opacity 0.2s; text-transform: uppercase; }
    .copy-btn:hover { opacity: 0.7; }
    .clip-meta-row { margin-top: 14px; padding-top: 14px; border-top: 1px solid #1a1f24; display: flex; flex-direction: column; gap: 10px; }
    .clip-meta-item { display: flex; gap: 10px; align-items: flex-start; }
    .meta-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #444; white-space: nowrap; padding-top: 2px; min-width: 72px; }
    .meta-text { font-size: 12px; color: #aaa; line-height: 1.5; font-style: italic; }
    .hidden { display: none; }
  </style>
</head>
<body>
<div class="app">

  <div class="header">
    <div class="header-eyebrow">Trading Patiently</div>
    <h1 class="header-title">CLIP<br /><span>FINDER</span></h1>
    <p class="header-sub">Drop your raw stream video — it auto-transcribes and finds the best viral moments. No YouTube wait, no manual copy/paste.</p>
  </div>

  <!-- TABS -->
  <div class="tabs">
    <button class="tab-btn active" id="tabUpload" onclick="switchTab('upload')">Upload Video</button>
    <button class="tab-btn" id="tabPaste" onclick="switchTab('paste')">Paste Transcript</button>
  </div>

  <!-- UPLOAD TAB -->
  <div id="uploadPanel">
    <div class="section">
      <div class="field-label">Stream Video File</div>
      <div class="dropzone" id="dropzone" onclick="document.getElementById('fileInput').click()">
        <div class="dropzone-icon">🎬</div>
        <div class="dropzone-text">Drop your video file here, or click to browse</div>
        <div class="dropzone-sub">MP4, MOV, MKV, WEBM — any length</div>
      </div>
      <input type="file" id="fileInput" class="file-input" accept="video/*,audio/*" onchange="handleFileSelect(event)" />

      <div class="file-selected hidden" id="fileSelected">
        <div class="file-selected-info">
          <div class="file-icon">🎬</div>
          <div>
            <div class="file-name" id="fileName"></div>
            <div class="file-size" id="fileSize"></div>
          </div>
        </div>
        <button class="file-remove" onclick="removeFile()">Remove</button>
      </div>
    </div>

    <button class="analyze-btn" id="processBtn" onclick="processVideo()" disabled>TRANSCRIBE + FIND CLIPS</button>
  </div>

  <!-- PASTE TAB -->
  <div id="pastePanel" class="hidden">
    <div class="section">
      <div class="field-label">Stream Transcript</div>
      <div class="how-to">
        <div class="how-to-title">How to get your transcript from YouTube</div>
        <ol>
          <li>Open your stream VOD on YouTube</li>
          <li>Click <span>···</span> (three dots) below the video → <span>Show transcript</span></li>
          <li>In the transcript panel, click the <span>three dots</span> → <span>Toggle timestamps ON</span></li>
          <li>Click inside the transcript → <span>Ctrl+A</span> to select all → <span>Ctrl+C</span> to copy</li>
          <li>Paste below</li>
        </ol>
      </div>
      <textarea class="transcript-box" id="transcriptInput" placeholder="Paste your full YouTube transcript here (with timestamps)..." oninput="updateCharCount()"></textarea>
      <div class="char-count" id="charCount">0 characters</div>
    </div>
    <button class="analyze-btn" id="analyzeBtn" onclick="analyzeTranscript()" disabled>FIND CLIPS</button>
  </div>

  <!-- LOADING -->
  <div class="loading-state hidden" id="loadingState">
    <div class="loading-bar"><div class="loading-bar-fill indeterminate" id="loadingBarFill"></div></div>
    <div class="loading-label" id="loadingLabel">Processing...</div>
    <div class="loading-step" id="loadingStep"></div>
    <div class="loading-pct" id="loadingPct"></div>
  </div>

  <div class="error-box hidden" id="errorBox"></div>
  <div class="warn-box hidden" id="warnBox"></div>

  <div id="results" class="hidden" style="margin-top:32px;">
    <div class="results-header">
      <div>
        <div class="st-label">Suggested Title</div>
        <div class="st-value" id="streamTitle"></div>
      </div>
      <button class="export-btn" id="exportBtn" onclick="exportSheet()">Export Clip Sheet</button>
    </div>
    <div class="clips-grid" id="clipsGrid"></div>
  </div>

</div>

<script src="https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/umd/ffmpeg.js"></script>
<script src="https://unpkg.com/@ffmpeg/util@0.12.1/dist/umd/index.js"></script>
<script>
  const TYPE_META = {
    prediction: { label: 'Live Prediction',   color: '#ce93d8', icon: '📈' },
    entry_exit: { label: 'Trade Entry/Exit',  color: '#00ff87', icon: '⚡' },
    reaction:   { label: 'Reaction',          color: '#ff6b35', icon: '🔥' },
    teaching:   { label: 'Teaching',          color: '#4fc3f7', icon: '🎯' },
    prop_firm:  { label: 'Prop Firm',         color: '#ffd700', icon: '💰' },
  };

  let currentClips = [], currentTitle = '';
  let selectedFile = null;
  let ffmpegInstance = null;

  // ---------- TABS ----------
  function switchTab(tab) {
    document.getElementById('tabUpload').classList.toggle('active', tab === 'upload');
    document.getElementById('tabPaste').classList.toggle('active', tab === 'paste');
    document.getElementById('uploadPanel').classList.toggle('hidden', tab !== 'upload');
    document.getElementById('pastePanel').classList.toggle('hidden', tab !== 'paste');
    hideError(); hideWarn();
  }

  // ---------- FILE SELECT ----------
  const dropzone = document.getElementById('dropzone');
  ['dragover', 'dragenter'].forEach(evt =>
    dropzone.addEventListener(evt, e => { e.preventDefault(); dropzone.classList.add('dragover'); })
  );
  ['dragleave', 'drop'].forEach(evt =>
    dropzone.addEventListener(evt, e => { e.preventDefault(); dropzone.classList.remove('dragover'); })
  );
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) selectFile(file);
  });

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) selectFile(file);
  }

  function selectFile(file) {
    selectedFile = file;
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = formatBytes(file.size);
    document.getElementById('fileSelected').classList.remove('hidden');
    document.getElementById('dropzone').classList.add('hidden');
    document.getElementById('processBtn').disabled = false;
  }

  function removeFile() {
    selectedFile = null;
    document.getElementById('fileInput').value = '';
    document.getElementById('fileSelected').classList.add('hidden');
    document.getElementById('dropzone').classList.remove('hidden');
    document.getElementById('processBtn').disabled = true;
  }

  function formatBytes(bytes) {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }

  // ---------- TRANSCRIPT PASTE TAB ----------
  function updateCharCount() {
    const len = document.getElementById('transcriptInput').value.length;
    const el = document.getElementById('charCount');
    if (len === 0) { el.textContent = '0 characters'; el.className = 'char-count'; }
    else if (len < 500) { el.textContent = `${len.toLocaleString()} characters — looks short`; el.className = 'char-count'; }
    else { el.textContent = `${len.toLocaleString()} characters ✓`; el.className = 'char-count ok'; }
    document.getElementById('analyzeBtn').disabled = len < 100;
  }

  function formatTime(s) {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    return `${m}:${String(sec).padStart(2,'0')}`;
  }

  function showError(msg) { const el = document.getElementById('errorBox'); el.textContent = '⚠ ' + msg; el.classList.remove('hidden'); }
  function hideError() { document.getElementById('errorBox').classList.add('hidden'); }
  function showWarn(msg) { const el = document.getElementById('warnBox'); el.textContent = '⚠ ' + msg; el.classList.remove('hidden'); }
  function hideWarn() { document.getElementById('warnBox').classList.add('hidden'); }

  function setLoading(on, label, step, pct) {
    document.getElementById('loadingState').classList.toggle('hidden', !on);
    if (label !== undefined) document.getElementById('loadingLabel').textContent = label;
    if (step !== undefined) document.getElementById('loadingStep').textContent = step;
    const pctEl = document.getElementById('loadingPct');
    const barFill = document.getElementById('loadingBarFill');
    if (pct !== undefined && pct !== null) {
      pctEl.textContent = `${Math.round(pct)}%`;
      barFill.classList.remove('indeterminate');
      barFill.style.width = `${Math.round(pct)}%`;
    } else {
      pctEl.textContent = '';
      barFill.classList.add('indeterminate');
    }
  }

  // ---------- VIDEO PROCESSING PIPELINE ----------
  async function loadFfmpeg(onLog) {
    if (ffmpegInstance) return ffmpegInstance;
    const { FFmpeg } = FFmpegWASM;
    const ffmpeg = new FFmpeg();
    if (onLog) ffmpeg.on('log', ({ message }) => onLog(message));
    await ffmpeg.load({
      coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js',
      wasmURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm',
    });
    ffmpegInstance = ffmpeg;
    return ffmpeg;
  }

  async function processVideo() {
    if (!selectedFile) return;
    hideError(); hideWarn();
    document.getElementById('results').classList.add('hidden');
    document.getElementById('processBtn').disabled = true;

    try {
      // STEP 1: Load ffmpeg
      setLoading(true, 'Loading audio engine...', 'Setting up in-browser audio extraction (first time only)', null);
      const ffmpeg = await loadFfmpeg();

      // STEP 2: Write input file
      setLoading(true, 'Reading video file...', selectedFile.name, 5);
      const { fetchFile } = FFmpegUtil;
      const inputName = 'input' + (selectedFile.name.match(/\.\w+$/)?.[0] || '.mp4');
      await ffmpeg.writeFile(inputName, await fetchFile(selectedFile));

      // STEP 3: Extract audio as compressed mp3 (mono, 16kHz is enough for speech, keeps file small)
      setLoading(true, 'Extracting audio from video...', 'This can take a few minutes for long streams — keep this tab open', 15);
      await ffmpeg.exec(['-i', inputName, '-vn', '-ac', '1', '-ar', '16000', '-b:a', '64k', 'audio.mp3']);
      const audioData = await ffmpeg.readFile('audio.mp3');
      const audioBlob = new Blob([audioData.buffer], { type: 'audio/mp3' });

      // cleanup large input from ffmpeg's virtual fs to free memory
      try { await ffmpeg.deleteFile(inputName); } catch {}

      setLoading(true, 'Audio extracted', `${formatBytes(audioBlob.size)} of audio ready to transcribe`, 30);

      // STEP 4: Get audio duration
      const duration = await getAudioDuration(audioBlob);

      // STEP 5: Chunk audio into ~20MB / ~20min pieces (Whisper limit is 25MB)
      const CHUNK_SECONDS = 18 * 60; // 18 min chunks, comfortably under 25MB at 64kbps mono
      const numChunks = Math.ceil(duration / CHUNK_SECONDS);

      let allSegments = [];
      let fullText = '';

      for (let i = 0; i < numChunks; i++) {
        const startSec = i * CHUNK_SECONDS;
        const pct = 30 + Math.round((i / numChunks) * 60);
        setLoading(true, 'Transcribing...', `Chunk ${i + 1} of ${numChunks} — this is the longest step`, pct);

        const chunkName = `chunk_${i}.mp3`;
        await ffmpeg.exec(['-i', 'audio.mp3', '-ss', String(startSec), '-t', String(CHUNK_SECONDS), '-acodec', 'copy', chunkName]);
        const chunkData = await ffmpeg.readFile(chunkName);
        const chunkBlob = new Blob([chunkData.buffer], { type: 'audio/mp3' });
        try { await ffmpeg.deleteFile(chunkName); } catch {}

        const result = await transcribeChunk(chunkBlob, i, startSec);
        allSegments = allSegments.concat(result.segments || []);
        fullText += (fullText ? '\n' : '') + (result.text || '');
      }

      try { await ffmpeg.deleteFile('audio.mp3'); } catch {}

      if (!fullText || fullText.trim().length < 100) {
        throw new Error('Transcription produced too little text. The video may have no clear speech audio.');
      }

      // STEP 6: Build a timestamped transcript string from segments
      setLoading(true, 'Building transcript...', 'Formatting timestamps', 92);
      const transcriptText = allSegments
        .map(seg => `[${formatTime(seg.start)}] ${seg.text.trim()}`)
        .join('\n');

      // STEP 7: Run viral clip analysis
      setLoading(true, 'Scanning for viral moments...', 'Applying the Hook → Retain → Reward framework', 96);
      await runClipAnalysis(transcriptText);

    } catch (err) {
      showError(err.message || 'Something went wrong while processing the video.');
    } finally {
      setLoading(false);
      document.getElementById('processBtn').disabled = false;
    }
  }

  function getAudioDuration(blob) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.onloadedmetadata = () => resolve(audio.duration);
      audio.onerror = () => reject(new Error('Could not read audio duration.'));
      audio.src = URL.createObjectURL(blob);
    });
  }

  async function transcribeChunk(blob, index, offsetSeconds) {
    const res = await fetch('/api/transcribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'audio/mpeg',
        'X-Chunk-Index': String(index),
        'X-Chunk-Offset-Seconds': String(offsetSeconds),
      },
      body: blob,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Transcription failed on chunk ${index + 1}`);
    return data;
  }

  // ---------- TRANSCRIPT TAB ANALYZE ----------
  async function analyzeTranscript() {
    const transcript = document.getElementById('transcriptInput').value.trim();
    if (transcript.length < 100) { showError('Transcript too short — paste the full transcript with timestamps.'); return; }
    hideError(); hideWarn();
    document.getElementById('results').classList.add('hidden');
    setLoading(true, 'Scanning for viral moments...', 'Applying the Hook → Retain → Reward framework', null);
    document.getElementById('analyzeBtn').disabled = true;
    try {
      await runClipAnalysis(transcript);
    } catch (err) {
      showError(err.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
      document.getElementById('analyzeBtn').disabled = false;
    }
  }

  // ---------- SHARED CLIP ANALYSIS CALL ----------
  async function runClipAnalysis(transcript) {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
    currentClips = data.clips || [];
    currentTitle = data.stream_title || '';
    renderResults();
  }

  function renderResults() {
    if (!currentClips.length) { showError('No clips identified — try a longer transcript.'); return; }
    document.getElementById('streamTitle').textContent = currentTitle;
    const grid = document.getElementById('clipsGrid');
    grid.innerHTML = '';
    currentClips.forEach((clip, i) => {
      const meta = TYPE_META[clip.type] || TYPE_META.entry_exit;
      const card = document.createElement('div');
      card.className = 'clip-card';
      card.style.setProperty('--accent', meta.color);
      card.innerHTML = `
        <div class="clip-header">
          <div class="clip-index">#${String(i+1).padStart(2,'0')}</div>
          <div class="clip-badge" style="color:${meta.color};border-color:${meta.color}">${meta.icon} ${meta.label}</div>
          <div class="clip-viral-score"><span class="viral-label">Viral Score</span><span class="viral-value" style="color:${meta.color}">${clip.viral_score}/10</span></div>
        </div>
        <div class="clip-title">${clip.title}</div>
        <div class="clip-why">${clip.why_viral}</div>
        <div class="clip-footer">
          <div class="clip-timestamp">
            <span class="ts-label">START</span>
            <span class="ts-value" style="color:${meta.color}">${formatTime(clip.start_seconds)}</span>
            ${clip.end_seconds ? `<span class="ts-sep">→</span><span class="ts-label">END</span><span class="ts-value">${formatTime(clip.end_seconds)}</span>` : ''}
          </div>
          <button class="copy-btn" style="border-color:${meta.color};color:${meta.color}" onclick="copyTs(this, '${formatTime(clip.start_seconds)}')">Copy Timestamp</button>
        </div>
        <div class="clip-meta-row">
          ${clip.hook_suggestion ? `<div class="clip-meta-item"><span class="meta-label">⚡ HOOK</span><span class="meta-text">"${clip.hook_suggestion}"</span></div>` : ''}
          ${clip.payoff ? `<div class="clip-meta-item"><span class="meta-label">🎯 PAYOFF</span><span class="meta-text">${clip.payoff}</span></div>` : ''}
          ${clip.cta_suggestion ? `<div class="clip-meta-item"><span class="meta-label">📣 CTA</span><span class="meta-text">"${clip.cta_suggestion}"</span></div>` : ''}
        </div>
      `;
      grid.appendChild(card);
    });
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function copyTs(btn, ts) {
    navigator.clipboard.writeText(ts).then(() => {
      const orig = btn.textContent;
      btn.textContent = '✓ Copied';
      setTimeout(() => btn.textContent = orig, 2000);
    });
  }

  function exportSheet() {
    const lines = [
      'TRADING PATIENTLY — CLIP SHEET',
      `Stream: ${currentTitle}`,
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      ...currentClips.map((c, i) => [
        `CLIP #${String(i+1).padStart(2,'0')} — ${c.title}`,
        `Type: ${c.type.replace('_',' ').toUpperCase()} | Score: ${c.viral_score}/10`,
        `Timestamp: ${formatTime(c.start_seconds)} → ${formatTime(c.end_seconds || c.start_seconds + 120)}`,
        `Why: ${c.why_viral}`,
        `Hook (first 3 sec): "${c.hook_suggestion}"`,
        `Payoff (build toward): ${c.payoff}`,
        `CTA: "${c.cta_suggestion}"`,
        '',
      ].join('\n')),
    ];
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      const btn = document.getElementById('exportBtn');
      btn.textContent = '✓ Copied to Clipboard';
      setTimeout(() => btn.textContent = 'Export Clip Sheet', 2500);
    });
  }
</script>
</body>
</html>
