import abcjs from 'abcjs';

export let parseAbc = (text) => {
    let str = text;
    str = str.split("X:1").pop();
    console.log("yuh");
    console.log("X:1" + str);
    abcjs.renderAbc("paper", "X:1\nK:D\nDD AA|BBA2|\n");
    // download("song.abc", str)
}
  
  
export function download(filename, text) {
    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
  
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
};

