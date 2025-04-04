const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');

class Scratch3YourExtension {

    constructor (runtime) {
        this.runtime = runtime;
        this.dictionaries = [
          { value : 'EnglishC+V', text : 'C+V English' },
          { value : 'JapaneseC+V', text : 'C+V Japanese' },
          { value : 'JapaneseCV', text : 'CV Japanese' }
      ];
    }

    /**
     * Returns the metadata about your extension.
     */
    getInfo () {
      return {
        // unique ID for your extension
        id: 'yourScratchExtension',

        // name displayed in the Scratch UI
        name: 'ScratchSpeech',

        // colours to use for your extension blocks
        color1: '#000099',
        color2: '#660066',

        // your Scratch blocks
        blocks: [
          {
            // function where your code logic lives
            opcode: 'myFirstBlock',

                    // type of block - choose from:
                    //   BlockType.REPORTER - returns a value, like "direction"
                    //   BlockType.BOOLEAN - same as REPORTER but returns a true/false value
                    //   BlockType.COMMAND - a normal command block, like "move {} steps"
                    //   BlockType.HAT - starts a stack if its value changes from false to true ("edge triggered")
                    blockType: BlockType.COMMAND,

                    // label to display on the block
                    text: 'speak [MY_STRING] at pitch [PITCH]',

                    // true if this block should end a stack
                    terminal: false,

                    // where this block should be available for code - choose from:
                    //   TargetType.SPRITE - for code in sprites
                    //   TargetType.STAGE  - for code on the stage / backdrop
                    // remove one of these if this block doesn't apply to both
                    filter: [ TargetType.SPRITE, TargetType.STAGE ],

                    // arguments used in the block
                    arguments: {
                        MY_STRING: {
                            // default value before the user sets something
                            defaultValue: '_hEHlOE w3ld',

                            // type/shape of the parameter - choose from:
                            //     ArgumentType.ANGLE - numeric value with an angle picker
                            //     ArgumentType.BOOLEAN - true/false value
                            //     ArgumentType.COLOR - numeric value with a colour picker
                            //     ArgumentType.NUMBER - numeric value
                            //     ArgumentType.STRING - text value
                            //     ArgumentType.NOTE - midi music value with a piano picker
                            type: ArgumentType.STRING
                        },
                        PITCH: {
                            // default value before the user sets something
                            defaultValue: '1',

                            // type/shape of the parameter - choose from:
                            //     ArgumentType.ANGLE - numeric value with an angle picker
                            //     ArgumentType.BOOLEAN - true/false value
                            //     ArgumentType.COLOR - numeric value with a colour picker
                            //     ArgumentType.NUMBER - numeric value
                            //     ArgumentType.STRING - text value
                            //     ArgumentType.NOTE - midi music value with a piano picker
                            type: ArgumentType.NUMBER
              }
            }
          },
          {
            // function where your code logic lives
            opcode: 'mySecondBlock',

            // type of block
            blockType: BlockType.COMMAND,

            // label to display on the block
            text: 'sing from ust: [UST]',

            // arguments used in the block
            arguments: {
              UST: {
                defaultValue: 'Copy and paste UST contents here',

                // type/shape of the parameter
                type: ArgumentType.STRING
              }
            }
          },
          {
                // function where your code logic lives
                opcode: 'myThirdBlock',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: {
                        default: 'set dictionary to: [DICTIONARY]',
                        id: 'setDictionary'
                    },
                    arguments: {
                        STATUS: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: this.dictionaries[0].value,
                            menu: 'dictionaries'
                        }
                    }
                }
            ],

            menus: {
              dictionaries: this.dictionaries
              }
            }
        }


    /**
     * implementation of the block with the opcode that matches this name
     *  this will be called when the block is used
     */
    myFirstBlock ({ MY_STRING, PITCH }) {
      
      function loadSound(url) {
             return fetch(url)
                 .then(response => response.arrayBuffer())
                 .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
         }

         function playSound(audioBuffer) {
             const soundSource = audioContext.createBufferSource();
             soundSource.buffer = audioBuffer;
             soundSource.playbackRate.value = PITCH;
             soundSource.connect(audioContext.destination);
             soundSource.start();
         }

         let EnglishOriginal = "ay ey oy uy ei er ce ck or ry ur eigh ic i e ea"
         let EnglishPhonetic = "EI EE OY AI EE 3 s k 0r EE 3 EI AI IH EH EE"
         let EnglishGrapheme = "at"
         let EnglishPhoneme = "@-t "
         let EnglishOriginal2 = EnglishOriginal.split(" ");
         let EnglishPhonetic2 = EnglishPhonetic.split(" ");
         let EnglishGrapheme2 = EnglishGrapheme.split(" ");
         let EnglishPhoneme2 = EnglishPhoneme.split("-");
         let j = 0;

       for (let i = 0; i < MY_STRING.length; i++) {

         if ('Dh Ng Zh Th Sh ch 0r AI EI AH EH IH OE OO OY EE UH YU'.includes(MY_STRING[i].concat(MY_STRING[(i + 1)]))) {
           let baseURL = 'https://thenoceboeffect.github.io/sounds/';
           let fileExtension = '.wav';
           let concatAudio = MY_STRING[i].concat(MY_STRING[(i + 1)])
           let soundURL = baseURL.concat(concatAudio, fileExtension);
           setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 100);
           let multiChar = 1
                       } else if ('SHr Skr Nks aNg'.includes(MY_STRING[i].concat(MY_STRING[(i + 1)], MY_STRING[(i + 2)]))) {
                                 let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                                 let fileExtension = '.wav';
                                 let concatAudio = MY_STRING[i].concat(MY_STRING[(i + 1)], MY_STRING[(i + 2)])
                                 let soundURL = baseURL.concat(concatAudio, fileExtension);
                                 setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 150);
                                 let multiChar = 2
                             } else if ('NCHt NcTh 7MFs _IN_ _EX_'.includes(MY_STRING[i].concat(MY_STRING[(i + 1)], MY_STRING[(i + 2)], MY_STRING[(i + 3)]))) {
                                 let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                                 let fileExtension = '.wav';
                                 let concatAudio = MY_STRING[i].concat(MY_STRING[(i + 1)], MY_STRING[(i + 2)], MY_STRING[(i + 3)])
                                 let soundURL = baseURL.concat(concatAudio, fileExtension);
                                 setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 150);
                                 let multiChar = 3
                                 // Start of phonemization code
                                } else if (EnglishOriginal2.includes(MY_STRING[i].concat(MY_STRING[(i + 1)], MY_STRING[(i + 2)], MY_STRING[(i + 3)]))) {
                                  let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                                  let fileExtension = '.wav';
                                  let concatAudio = EnglishPhonetic2[EnglishOriginal2.indexOf(MY_STRING[i].concat(MY_STRING[(i + 1)], MY_STRING[(i + 2)], MY_STRING[(i + 3)]))]
                                  let soundURL = baseURL.concat(concatAudio, fileExtension);
                                  setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 150);
                                  let multiChar = 4
                                } else if (EnglishOriginal2.includes(MY_STRING[i].concat(MY_STRING[(i + 1)], MY_STRING[(i + 2)]))) {
                                  let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                                  let fileExtension = '.wav';
                                  let concatAudio = EnglishPhonetic2[EnglishOriginal2.indexOf(MY_STRING[i].concat(MY_STRING[(i + 1)], MY_STRING[(i + 2)]))]
                                  let soundURL = baseURL.concat(concatAudio, fileExtension);
                                  setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 150);
                                  let multiChar = 7
                                } else if (EnglishOriginal2.includes(MY_STRING[i].concat(MY_STRING[(i + 1)]))) {
                                let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                                let fileExtension = '.wav';
                                let concatAudio = EnglishPhonetic2[EnglishOriginal2.indexOf(MY_STRING[i].concat(MY_STRING[(i + 1)]))]
                                let soundURL = baseURL.concat(concatAudio, fileExtension);
                                setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 150);
                                let multiChar = 1
                                //The part of the else if statement repeats forever. Why is this? (specifically the string)
                              } else if (EnglishGrapheme2.includes(MY_STRING[i].concat(MY_STRING[(i + 1)]))) {
                              let j = 0;
                              while(!' '.includes(EnglishPhoneme2[j])) {
                              let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                              let fileExtension = '.wav';
                              let concatAudio = ((EnglishPhoneme2[EnglishGrapheme2.indexOf(MY_STRING[i].concat(MY_STRING[(i + 1)]))])[j])
                              let soundURL = baseURL.concat(concatAudio, fileExtension);
                              setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 150);
                              j++
                            }
                                } else if ('/'.includes(MY_STRING[i])) {
                                  let concatAudio = "b".concat(MY_STRING[(i + 1)])
                                  let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                                  let fileExtension = '.wav'
                                  let soundURL = baseURL.concat(concatAudio, fileExtension)
                                  setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 100);
                                  let multiChar = 3
                       } else if (multiChar = 0) {
                             let concatAudio = MY_STRING[i]
                             //let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                             let baseURL = 'https://thenoceboeffect.github.io/CV-JPNTestVocal/';
                             let fileExtension = '.wav'
                             let soundURL = baseURL.concat(concatAudio, fileExtension)
                             setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 150);
                             let multiChar = 0
                         } else if (multiChar = 1) {
                             let concatAudio = MY_STRING[(i + 1)]
                             let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                             let fileExtension = '.wav'
                             let soundURL = baseURL.concat(concatAudio, fileExtension)
                             setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 150);
                             let multiChar = 0
                         } else if (multiChar = 2) {
                             let concatAudio = MY_STRING[(i + 2)]
                             let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                             let fileExtension = '.wav'
                             let soundURL = baseURL.concat(concatAudio, fileExtension)
                             setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 150);
                             let multiChar = 1
                         } else if (multiChar = 3) {
                             let concatAudio = MY_STRING[(i + 3)]
                             let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                             let fileExtension = '.wav'
                             let soundURL = baseURL.concat(concatAudio, fileExtension)
                             setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 150);
                             let multiChar = 2
                           } else if (multiChar = 4) {
                               let concatAudio = EnglishPhonetic[EnglishOriginal.indexOf(MY_STRING[i].concat(MY_STRING[(i + 1)], MY_STRING[(i + 2)], MY_STRING[(i + 3)], "2"))]
                               let baseURL = 'https://thenoceboeffect.github.io/sounds/';
                               let fileExtension = '.wav'
                               let soundURL = baseURL.concat(concatAudio, fileExtension)
                               setTimeout(() => { loadSound(soundURL).then(playSound); }, i * 150);
                               let multiChar = 5
                               // Add other variants of 'multichar' for phonemization after finishing phonemization engine
                              }
                            }
                          }
            

  mySecondBlock({ UST }) {
    let ustLyricList2 = "";
    let NoteLengthList2 = "";
    let NoteNumList2 = "";
    let k = -1;

    for (let i = 0; i < UST.length; i++) {
        if ('Ly'.includes(UST[i].concat(UST[i + 1]))) {
            let ustLyricList = [];
            while (!'N'.includes(UST[i + 6])) {
                ustLyricList.push(UST[i + 6]);
                i++;
            }
            ustLyricList2 = ustLyricList.join("");
        } else if ('Le'.includes(UST[i].concat(UST[i + 1]))) {
            let NoteLengthList = [];
            while (!'Ly'.includes(UST[i + 8].concat(UST[i + 9]))) {
                NoteLengthList.push(UST[i + 8]);
                i++;
            }
            NoteLengthList2 = NoteLengthList.join("");
        } else if ('No'.includes(UST[i].concat(UST[i + 1]))) {
            let NoteNumList = [];
            while (!'P'.includes(UST[i + 9])) {
                NoteNumList.push(UST[i + 8]);
                i++;
            }
            NoteNumList2 = NoteNumList.join("");
            if (ustLyricList2 && NoteNumList2 && NoteLengthList2) {
        let j = 0;
        let TempLyric = [];
        let TempNoteNum = [];
        let TempLength = [];

        while (j < ustLyricList2.length && ustLyricList2[j] !== ' ') {
            TempLyric.push(ustLyricList2[j]);
            TempNoteNum.push(NoteNumList2[j] || "0");
            TempLength.push(NoteLengthList2[j] || "0");
            j++;
        }

        let TempLyric2 = TempLyric.join("");
        let TempNoteNum2 = TempNoteNum.join("");
        let TempLength2 = TempLength.join("");

        let noteDuration = (TempLength2 / 480) * 2000; 

                if (TempLyric2 === "R") {
                    // Rest note
                    k += noteDuration;
                    continue;
                }

        function loadSoundFromUST(url) {
             return fetch(url)
                 .then(response => response.arrayBuffer())
                 .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
         }

    function playSoundFromUST(audioBuffer) {
        const soundSource = audioContext.createBufferSource();
        soundSource.buffer = audioBuffer;
        soundSource.playbackRate.value = (1.00 + (TempNoteNum2 / 1000));
        soundSource.connect(audioContext.destination);
        soundSource.start();
    }

        let baseURL = 'https://thenoceboeffect.github.io/sounds/';
        let fileExtension = '.wav';
        let soundURL = baseURL.concat(TempLyric2, fileExtension);

        k += noteDuration;

        setTimeout(() => { loadSoundFromUST(soundURL).then(playSoundFromUST); }, k * 6)
          }
        }
      } 
    }

      myThirdBlock({ DICTIONARY }) {
      }
    }

module.exports = Scratch3YourExtension;