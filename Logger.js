


class Logger {
    static _level = 0;
    static header() {
        return " ".repeat(Logger._level * 4);
    }

    static get_caller() {
        const lines = new Error().stack.split("\n");
        const caller_line = lines[3];
        const m = /at\s+([^\s]+)((?!:\d).)*:(\d+)/.exec(caller_line);
        //console.log(caller_line);

        if (m) {
            //console.log('matched: ', m);
            return `at ${m[1]}:${m[3]}`;
        }
        return caller_line;
    }
    constructor(msg = '') {
        this.msg = msg;
        console.log(Logger.header(), `{ ${this.msg} ${Logger.get_caller()}`);
        ++Logger._level;
    }

    dtor() {
        --Logger._level;
        console.log(Logger.header(), `} ${this.msg} ${Logger.get_caller()}`);
        this.msg = null;
    }

    log(...args) {
        console.log(Logger.header(), ...args, `${this.msg} ${Logger.get_caller()}`);
    }

};

export default Logger;