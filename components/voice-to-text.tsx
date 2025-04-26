import React, { useEffect, useState, useRef } from 'react';

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const VoiceToText: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<InstanceType<typeof SpeechRecognition> | null>(
    null
  );

  useEffect(() => {
    if (!SpeechRecognition) {
      alert('Speech Recognition API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        interimTranscript += result[0].transcript;
      }
      setTranscript(interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🎤 Voice to Text</h2>
      <p>
        <strong>Status:</strong> {isListening ? 'Listening...' : 'Stopped'}
      </p>
      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>
      <button
        onClick={stopListening}
        disabled={!isListening}
        style={{ marginLeft: '10px' }}
      >
        Stop Listening
      </button>
      <div
        style={{
          marginTop: '20px',
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '100px',
        }}
      >
        {transcript || 'Speak something...'}
      </div>
    </div>
  );
};

export default VoiceToText;
