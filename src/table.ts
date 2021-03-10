import {LitElement, html, customElement, property} from 'lit-element';


@customElement('table-tag')
export class tableTag extends LitElement{
        @property()
        name:String;

        @property()
        no:Number;

        @property()
        city:String;

        @property({
            hasChanged : ()  =>{
                return true;
            }
        })
        empObject:any;

        @property({ type: Array })
        empArray: any[] = [];

        @property({ type: Array ,converter: Array})
        empDetails: any[] = [];


        constructor(){
            super();
            this.name="";
            this.city="",
            this.no=0;
        }
        

        
    demo(event:any)

    {
        //from event fetching the id of record for deleting from array
        const id=event.path[2].innerText.toString().slice(0,1);
        // console.log(this.empArray);
        // console.log(this.empArray.splice(id,1));
        console.log(id);
        console.log("before splice",this.empArray.length);        
        console.log(this.empArray.splice(id,1));
        console.log("after splice",this.empArray.length);
        this.render();
    }

    render(){
        let flag=1;
        console.log("values at table page",this.empDetails);
        console.log(this.name+" "+this.city+" "+this.no);
        this.empObject={
            name:this.name,
            city:this.city,
            no:this.no
        }

        for(let i=0;i<this.empArray.length;i++)
        {
            if(this.empObject.name===this.empArray[i].name && this.empObject.no===this.empArray[i].no)
            {
                //If duplicate records are present change flag 
                console.log("element exists");
                flag=0;
            }
        }

        if(flag==1)
        {
            //unchanged value of flag indicate no duplicate record thus pushing data to array
            this.empArray.push(this.empObject);
        }
  
        if(this.empArray.length)
        {
           if(this.empArray[0].name==="undefined")
           this.empArray.pop();
           
           console.log("before render",this.empArray);
            return html `<h3></h3>
            <table id='td' border='1px solid black'>
            <tr>
                <th>Sr. no.</th>
                <th>Name</th>
                <th>City</th>
                <th>Contact no</th>
                <th>Action</th>
            </tr>
                ${this.empArray.map(data=>
                            html 
                            `<tr>
                                <td>${this.empArray.indexOf(data)}</td>
                                <td>${data.name}</td>
                                <td>${data.city}</td>
                                <td>${data.no}</td>
                                <td><button id='${this.empArray.indexOf(data)}' @click='${this.demo}' value='DELETE'>DELETE</button></td>
                            </tr>`     
                    )}
            </table>
            `;
        }
    }

}