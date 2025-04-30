


  function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          const videoElement = document.getElementById('camera');
          videoElement.srcObject = stream;
          videoElement.onpause = () => {
            stream.getTracks().forEach(track => track.stop());
          };
        })
        .catch(function(err) {
          console.log("Eroare la deschiderea camerei: " + err);
          alert("Nu am putut accesa camera.");
        });
    } else {
      alert("Camera nu este disponibilă pe acest dispozitiv sau browser.");
    }
  }
