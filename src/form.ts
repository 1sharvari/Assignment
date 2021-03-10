import {LitElement, html, customElement, property} from 'lit-element';


@customElement('user-form')
export class userForm extends LitElement{

    //empName,empNo,empCity are properties declared for name, city and contact detailed
    @property({type:String})
    empName:String;

    @property({type:String})
    empCity:String;

    @property()
    empNo:any;

    constructor()
    {
        super();
        this.empName="";
        this.empCity="";
        this.empNo="";
    }

    sendToParent() {
      //event for sending data to parent component
        let myevent = new CustomEvent('my-event', { 
            detail: {
                name:this.empName,
                no:this.empNo,
                city:this.empCity,
                bubbles: true, 
                composed: true
              }
        });
         this.dispatchEvent(myevent);
      }
      
      //below function will return input element of form for name
      private get inputEl1(): HTMLInputElement {
        return this.shadowRoot?.getElementById('name')! as HTMLInputElement;
      }

       //below function will return input element of form for city
      private get inputEl2(): HTMLInputElement {
        return this.shadowRoot?.getElementById('city')! as HTMLInputElement;
      }

       //below function will return input element of form for phone no
      private get inputEl3(): HTMLInputElement {
        return this.shadowRoot?.getElementById('phoneNo')! as HTMLInputElement;
      }

    submit(){
          
         this.empName=this.inputEl1.value;    //getting name value
         this.empCity=this.inputEl2.value;    //getting city value
         this.empNo=Number(this.inputEl3.value);  //getting phone no
         var numbers=/^(\+\d{1,3}[- ]?)?\d{10}$/; 
         var letters ="^[a-zA-Z ]+(\s[a-zA-Z]+)?$";
         var flag=1;

         //form validation code
         if(this.empName==="" && this.empCity==="" && this.empNo===null)
         {
           this.shadowRoot?.getElementById('nameError').innerHTML="Enter your name";
           this.shadowRoot?.getElementById('cityError').innerHTML="Enter city name";
           this.shadowRoot?.getElementById('noError').innerHTML="Enter contact number";
           flag=0;
         }
         if(this.empName=="")
         {
           this.shadowRoot?.getElementById('nameError').innerHTML="Enter your name";
           flag=0;
         }
         if(this.empCity=="")
         {
           console.log("in city")
           this.shadowRoot?.getElementById('cityError').innerHTML="Enter city name";
           flag=0;
         }
         if(this.empNo== null )
         {
           this.shadowRoot?.getElementById('noError').innerHTML="Enter contact number";
           flag=0;
         }
         if((this.empNo).toString().length<10 ||(this.empNo).toString().length>10)
         {
           this.shadowRoot?.getElementById("noError").innerHTML="Mobile no must have 10 digits only <br>with no alphabets";
           flag=0;
         }
          if(!this.empName.match(letters))
          {
            this.shadowRoot?.getElementById('nameError').innerHTML="name must have alphabet characters only";
            flag=0;
          }
          if(this.empName.match(letters))
          {
            this.shadowRoot?.getElementById('nameError').innerHTML="";
          }
          if((this.empNo).toString().length==10)
          {
            this.shadowRoot?.getElementById("noError").innerHTML="";
          }
          if(this.empCity)
         {
           this.shadowRoot?.getElementById('cityError').innerHTML="";
         }
          if(flag==1)
          {
            this.shadowRoot?.getElementById('nameError').innerHTML="";
            this.shadowRoot?.getElementById('cityError').innerHTML="";
            this.shadowRoot?.getElementById('noError').innerHTML="";
            console.log("values at child component : ",this.empName+" "+this.empNo+" "+this.empCity);
            this.sendToParent();          //calling function where custom event is defined
            return true;
          }
          if(flag==0)
          {
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
              <p class="col">Name : </p>
              <input type='text' class='col' id='name' value='${this.empName}' placeholder="Enter name"><br><br>
              <span class='col' id='nameError'></span><br><br>
              </div>
              
              <div class='row'>
              <p class="col">City : </p>
              <input type='text' class='col' id='city' value='${this.empCity}' placeholder="Enter your city"><br><br>
              <span class='col' id='cityError'></span><br><br>
              </div>
              
              <div class='row'>
              <p class="col">Mobile No : </p>
              <input type='text' class='col' id='phoneNo' value='${this.empNo}' placeholder="Enter phone no"><br><br>
              <span class='col' id='noError'></span><br><br>
              </div>
        
              <input type='button'class='success' value="submit" @click='${this.submit}'>  
              <input type='reset' class='danger' value='cancle'>
          </fieldset>
        </form>
        `;
    }
}