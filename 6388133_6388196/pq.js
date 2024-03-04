// User defined class
// to store element and its priority
class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

// PriorityQueue class
class PriorityQueue {

    // An array is used to implement priority
    constructor() {
        this.items = [];
    }

    // enqueue function to add element
    enqueue(element, priority) {
        // creating object from queue element
        var qElement = new QElement(element, priority);
        var contain = false;

        // item array to add element at the
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        // it is added at the end of the queue if element has a highest priority
        if (!contain) {
            this.items.push(qElement);
        }
    }

    // dequeue method to remove
    dequeue() {
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    // front function
    front() {
        // returns the highest priority element in the Priority queue without removing it
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }


    // rear function
    rear() {
        // returns the lowest priority
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length - 1];
    }

    // isEmpty function
    isEmpty() {
        return this.items.length == 0;
    }

    // prints all the element of the queue
    printPQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i].element + " ";
        return str;
    }
}
