export default class Command {
    constructor (name, description, callback) {
        this.name = name;
        this.description = description;
        this.callback = callback;
    }

    get info () {
        return {
            "name": this.name,
            "description": this.description
        }
    }

    init (c) {
        this.client = c;
    }
}