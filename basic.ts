console.log("Hello world");

abstract class Command<State> {
    abstract execute(state: State): State;
    abstract undo(state: State): State;
}

class CommandoStack<State> {

    public _stack: Command<State>[] = [];
 

    constructor(private _state: State) {
    }

    get state() : State {
        return this._state;
    }

    execute(command: Command<State>): void {
        this._state = command.execute(this._state);
        this._stack.push(command);
    }

    undo(): void {
        const command = this._stack.pop();
        //command ? command.undo(this._state) : console.log("nothing to undo.");

        if (command) {
            this._state = command.undo(this._state);
        }
    }
}

class AddOne extends Command<number> {
    execute(state: number): number {
        return state + 1
        //throw new Error("Method not implemented.");
    }
    undo(state: number): number {
        //throw new Error("Method not implemented.");
        
        return state - 1
    }
    
}

class SubstractOne extends Command<number> {
    execute(state: number): number {
        //throw new Error("Method not implemented.");
        return state -1
    }
    undo(state: number): number {
        return state + 1
    }

}

class SetValue extends Command<number> {
    private _value? : number 
    constructor(private value: number) {
        super();
    }

    execute(state: number): number {
        //throw new Error("Method not implemented.");
        this._value = state
        return this.value

        return state

    }
    undo(state: number): number {
        return this._value!;
    }

}

const cStack = new CommandoStack<number>(0);
cStack.execute(new AddOne());
console.log(cStack.state)
cStack.execute(new AddOne());
console.log(cStack.state)
cStack.undo()
console.log(cStack.state)
cStack.execute(new AddOne());
console.log(cStack.state)
cStack.execute(new SubstractOne());
cStack.execute(new SubstractOne());
cStack.execute(new SubstractOne());
console.log(cStack.state)
cStack.execute(new SetValue(10));
console.log(cStack.state);
cStack.execute(new SubstractOne());
console.log(cStack.state);
//cStack.undo();



//console.log(cStack)
/*class AddOne<State> extends Commando<State> {
    function execute(state: State) {

    }
}*/