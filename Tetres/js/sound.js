var audioPath = ["./assets/sound/01.mp3", "./assets/sound/music.mp3", "./assets/sound/10.mp3"];
			var totalAudio = 0;
			function onSoundLoad(id) {++totalAudio;
				alert(totalAudio + "==" + audioPath.length+"=="+id)
				if (totalAudio == audioPath.length) {
					alert("Loaded")
				}

			}

			function onSoundError() {
				alert("Error")
				//	++totalAudio;
				if (totalAudio == audioPath.length) {
					alert("Error")
				}

			}

			function muteAll() {
				alert("Error")
				//	++totalAudio;
				if (totalAudio == audioPath.length) {
					alert("Error")
				}

			}

			function plaYStart(){
					var sound1 = new Howl({
					  urls: [audioPath[1]],
					  autoplay: true,
					  loop: true,
					  volume: 0.6,
					  onend: function() {
						console.log('Finished!');
					  }
					});
				}
					
			var sound2 = new Howl({
				urls : [audioPath[2]]

			});
			var sound3 = new Howl({
				urls : [audioPath[0]]/*,onload:function(){alert("onLoad3")}*/

			});

			var isMute = false;
			/*muteBtn.addEventListener("click", function(event) {
				if (isMute) {
					Howler.unmute();
					isMute = false;
				} else {
					Howler.mute()
					isMute = true
				}

			})*/
