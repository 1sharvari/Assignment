var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
let tableTag = class tableTag extends LitElement {
    constructor() {
        super();
        this.empArray = [];
        this.empDetails = [];
        this.name = "";
        this.city = "",
            this.no = 0;
    }
    demo(event) {
        //from event fetching the id of record for deleting from array
        const id = event.path[2].innerText.toString().slice(0, 1);
        // console.log(this.empArray);
        // console.log(this.empArray.splice(id,1));
        console.log(id);
        console.log("before splice", this.empArray.length);
        console.log(this.empArray.splice(id, 1));
        console.log("after splice", this.empArray.length);
        this.render();
    }
    render() {
        let flag = 1;
        console.log("values at table page", this.empDetails);
        console.log(this.name + " " + this.city + " " + this.no);
        this.empObject = {
            name: this.name,
            city: this.city,
            no: this.no
        };
        for (let i = 0; i < this.empArray.length; i++) {
            if (this.empObject.name === this.empArray[i].name && this.empObject.no === this.empArray[i].no) {
                //If duplicate records are present change flag 
                console.log("element exists");
                flag = 0;
            }
        }
        if (flag == 1) {
            //unchanged value of flag indicate no duplicate record thus pushing data to array
            this.empArray.push(this.empObject);
        }
        if (this.empArray.length) {
            if (this.empArray[0].name === "undefined")
                this.empArray.pop();
            console.log("before render", this.empArray);
            return html `<h3></h3>
            <table id='td' border='1px solid black'>
            <tr>
                <th>Sr. no.</th>
                <th>Name</th>
                <th>City</th>
                <th>Contact no</th>
                <th>Action</th>
            </tr>
                ${this.empArray.map(data => html `<tr>
                                <td>${this.empArray.indexOf(data)}</td>
                                <td>${data.name}</td>
                                <td>${data.city}</td>
                                <td>${data.no}</td>
                                <td><button id='${this.empArray.indexOf(data)}' @click='${this.demo}' value='DELETE'>DELETE</button></td>
                            </tr>`)}
            </table>
            `;
        }
    }
};
__decorate([
    property()
], tableTag.prototype, "name", void 0);
__decorate([
    property()
], tableTag.prototype, "no", void 0);
__decorate([
    property()
], tableTag.prototype, "city", void 0);
__decorate([
    property({
        hasChanged: () => {
            return true;
        }
    })
], tableTag.prototype, "empObject", void 0);
__decorate([
    property({ type: Array })
], tableTag.prototype, "empArray", void 0);
__decorate([
    property({ type: Array, converter: Array })
], tableTag.prototype, "empDetails", void 0);
tableTag = __decorate([
    customElement('table-tag')
], tableTag);
export { tableTag };
//# sourceMappingURL=table.js.map