import React, { useRef, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";
import ControlButtons from "../Components/ControlButtons";
import { initiateRecordVisualizer } from "../Components/initiateRecordVisualizer";
import Microphone from "../Components/Microphone";
import { generateFileName, HTTPSTATUS } from "../../../helpers/utility";
import { audioRequest, voiceRequest } from "../../../helpers/requests_helper";

const VoiceInput = (props) => {
  const [micPlay, toggleMicPlay] = useState(false);
  const [controlButtons, toggleControlButtons] = useState(false);

  const cardHeight = 460;

  let stream = useRef({});
  let recorder = useRef({});
  let blob = useRef({});
  let audioData = useRef("");

  const toggleMic = () => {
    if (micPlay)
      document.getElementById("mic1").classList.remove("faa-pulse", "animated");
    else document.getElementById("mic1").classList.add("faa-pulse", "animated");

    toggleMicPlay(!micPlay);
  };

  const startRecording = async () => {
    toggleControlButtons(false);

    stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder.current = new RecordRTC(stream.current, {
      type: "audio",
      mimeType: "audio/wav",
      disableLogs: true,
    });

    toggleMic();

    initiateRecordVisualizer();

    recorder.current.startRecording();
  };

  const stopRecording = async () => {
    recorder.current.stopRecording(() => {
      blob.current = recorder.current.getBlob();
      audioData.current = new Audio(recorder.current.toURL());

      toggleControlButtons(true);

      //audioData.current.onended = (ev) => togglePlayIcon(!playIcon);
    });

    toggleMic();
  };

  const playAudio = async () =>
    typeof audioData.current !== "string"
      ? await audioData.current.play()
      : null;

  const pauseAudio = async () =>
    typeof audioData.current !== "string"
      ? await audioData.current.pause()
      : null;

  const toggleSend = () => {
    if (typeof audioData.current !== "string")
      document.getElementById("sen1").classList.add("faa-flash", "animated");
    else
      document.getElementById("sen1").classList.remove("faa-flash", "animated");
  };

  const toggleDownload = () => {
    if (typeof audioData.current !== "string") invokeSaveAsDialog(blob.current);
  };

  const sendRecord = async () => {
    if (typeof audioData.current !== "string") {
      let formData = new FormData();

      formData.set(
        "audio_file",
        blob.current,
        generateFileName(blob.current.type)
      );

      let audioRes = await audioRequest(formData);
      if (audioRes.status === HTTPSTATUS.ok) {
        audioData.current = await audioRes.json();
        toggleSend();
        //toggleGettingResponse(!isGettingResponse);

        let voiceRes = await voiceRequest({
          device_id: "abcdef123456",
          company: "Linkana",
          language: "en-EN",
          process_data: {
            audio_enable: true,
            audio_file: audioData.current,
            text_enable: true,
            only_tts: true,
            response_save: true,
            flow_id: "d59e28db-7fa7-498f-b56d-bfd0ecfd9271",
          },
        });
        console.log(voiceRes);

        voiceRes = await voiceRes.json();

        console.log(voiceRes);

        /*getQueries(query, token);

        toggleGettingResponse(!isGettingResponse);

        if (voiceRes.stt.result[1]) {
          sourceTable.current = false;
          fullResponse.current = voiceRes;

          setStt(voiceRes.stt.result[1] ? voiceRes.stt.result[0] : null);
          setNlu({
            query: voiceRes.nlu.result.queryText,
            intent: splitRejoinString(voiceRes.nlu.result.action, ".", ", "),
            fulfillment: voiceRes.nlu.result.fulfillmentText,
          });
        }*/
      }
    }
  };

  return (
    <Card>
      <CardTitle className="ai-card-title">
        Voice input (Recording is not working on Safari)
      </CardTitle>
      <CardBody style={{ height: cardHeight }}>
        <Microphone
          micPlay={micPlay}
          startRecording={startRecording}
          stopRecording={stopRecording}
        ></Microphone>
        {controlButtons ? (
          <ControlButtons
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            toggleSend={toggleSend}
            toggleDownload={toggleDownload}
            sendRecord={sendRecord}
          ></ControlButtons>
        ) : null}
      </CardBody>
    </Card>
  );
};

export default VoiceInput;
