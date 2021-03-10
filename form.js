var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
let userForm = class userForm extends LitElement {
    constructor() {
        super();
        this.empName = "";
        this.empCity = "";
        this.empNo = "";
    }
    sendToParent() {
        //event for sending data to parent component
        let myevent = new CustomEvent('my-event', {
            detail: {
                name: this.empName,
                no: this.empNo,
                city: this.empCity,
                bubbles: true,
                composed: true
            }
        });
        this.dispatchEvent(myevent);
    }
    //below function will return input element of form for name
    get inputEl1() {
        var _a;
        return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('name');
    }
    //below function will return input element of form for city
    get inputEl2() {
        var _a;
        return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('city');
    }
    //below function will return input element of form for phone no
    get inputEl3() {
        var _a;
        return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('phoneNo');
    }
    submit() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        this.empName = this.inputEl1.value; //getting name value
        this.empCity = this.inputEl2.value; //getting city value
        this.empNo = Number(this.inputEl3.value); //getting phone no
        var numbers = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        var letters = "^[a-zA-Z ]+(\s[a-zA-Z]+)?$";
        var flag = 1;
        //form validation code
        if (this.empName === "" && this.empCity === "" && this.empNo === null) {
            (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById('nameError').innerHTML = "Enter your name";
            (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('cityError').innerHTML = "Enter city name";
            (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById('noError').innerHTML = "Enter contact number";
            flag = 0;
        }
        if (this.empName == "") {
            (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.getElementById('nameError').innerHTML = "Enter your name";
            flag = 0;
        }
        if (this.empCity == "") {
            console.log("in city");
            (_e = this.shadowRoot) === null || _e === void 0 ? void 0 : _e.getElementById('cityError').innerHTML = "Enter city name";
            flag = 0;
        }
        if (this.empNo == null) {
            (_f = this.shadowRoot) === null || _f === void 0 ? void 0 : _f.getElementById('noError').innerHTML = "Enter contact number";
            flag = 0;
        }
        if ((this.empNo).toString().length < 10 || (this.empNo).toString().length > 10) {
            (_g = this.shadowRoot) === null || _g === void 0 ? void 0 : _g.getElementById("noError").innerHTML = "Mobile no must have 10 digits only <br>with no alphabets";
            flag = 0;
        }
        if (!this.empName.match(letters)) {
            (_h = this.shadowRoot) === null || _h === void 0 ? void 0 : _h.getElementById('nameError').innerHTML = "name must have alphabet characters only";
            flag = 0;
        }
        if (this.empName.match(letters)) {
            (_j = this.shadowRoot) === null || _j === void 0 ? void 0 : _j.getElementById('nameError').innerHTML = "";
        }
        if ((this.empNo).toString().length == 10) {
            (_k = this.shadowRoot) === null || _k === void 0 ? void 0 : _k.getElementById("noError").innerHTML = "";
        }
        if (this.empCity) {
            (_l = this.shadowRoot) === null || _l === void 0 ? void 0 : _l.getElementById('cityError').innerHTML = "";
        }
        if (flag == 1) {
            (_m = this.shadowRoot) === null || _m === void 0 ? void 0 : _m.getElementById('nameError').innerHTML = "";
            (_o = this.shadowRoot) === null || _o === void 0 ? void 0 : _o.getElementById('cityError').innerHTML = "";
            (_p = this.shadowRoot) === null || _p === void 0 ? void 0 : _p.getElementById('noError').innerHTML = "";
            console.log("values at child component : ", this.empName + " " + this.empNo + " " + this.empCity);
            this.sendToParent(); //calling function where custom event is defined
            return true;
        }
        if (flag == 0) {
            return false;
        }
    }
    render() {
        return html `
        <style>
          span{
            color:red;
          }
          .row{
            display:flex;
            flex-direction:row;

          }
          .col{
            width:33%;
          }
          .success{
            color:green;
          }
          .danger{
            color:red;
          }
        </style>
        <form style='width:50%'>
          <fieldset>
          <legend>Enter your details :</legend>
              <div class='row'>
              <p class="col">Name<span>*</span> : </p>
              <input type='text' class='col' id='name' value='${this.empName}' placeholder="Enter name"><br><br>
              <span class='col' id='nameError'></span><br><br>
              </div>
              
              <div class='row'>
              <p class="col">City<span>*</span> : </p>
              <input type='text' class='col' id='city' value='${this.empCity}' placeholder="Enter your city"><br><br>
              <span class='col' id='cityError'></span><br><br>
              </div>
              
              <div class='row'>
              <p class="col">Mobile No<span>*</span> : </p>
              <input type='text' class='col' id='phoneNo' value='${this.empNo}' placeholder="Enter phone no"><br><br>
              <span class='col' id='noError'></span><br><br>
              </div>
        
              <input type='button'class='success' value="submit" @click='${this.submit}'>  
              <input type='reset' class='danger' value='cancle'>
          </fieldset>
        </form>
        `;
    }
};
__decorate([
    property({ type: String })
], userForm.prototype, "empName", void 0);
__decorate([
    property({ type: String })
], userForm.prototype, "empCity", void 0);
__decorate([
    property()
], userForm.prototype, "empNo", void 0);
userForm = __decorate([
    customElement('user-form')
], userForm);
export { userForm };
//# sourceMappingURL=form.js.map