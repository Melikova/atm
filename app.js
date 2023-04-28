class Card{
    constructor(fname, lname){
        this.fname = fname.toUpperCase();
        this.lname = lname.toUpperCase();
        this.balance = 0;
        this.account = Math.floor(10000000000000 + Math.random() * 90000000000000);
        this.amount_input = document.querySelector("#amount");
        this.recent_transactions = [];
        this.show_info();
    }

    #get_amount(){
        return (Number.isInteger(parseInt(this.amount_input.value)) && parseInt(this.amount_input.value).toString().length == this.amount_input.value.length && !this.amount_input.value.includes("-"))? parseInt(this.amount_input.value):0;
    }

    #get_time(){
        let today = new Date();
        return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    }

    deposit(){ 
        if(this.#get_amount()!=0){
            this.recent_transactions.unshift({time: this.#get_time(), amount: this.#get_amount(), operation: "+"});
            this.balance+=this.#get_amount();
            this.#show_balance();
            this.#recent_transactions();
        }else{
            alert('Insert the correct amount, please');
        }
    }

    withdraw(){
        if(this.#get_amount()!=0){
           if(this.#get_amount()<=this.balance){
                this.recent_transactions.unshift({time: this.#get_time(), amount: this.#get_amount(), operation: "-"});
                this.balance-=this.#get_amount();
                this.#show_balance();
                this.#recent_transactions();
            }else{
                alert('Insufficient funds');
            }
        }else{
            alert('Insert the correct amount, please');
        }
    }

    #show_full_name(){
        document.querySelector("#full_name").innerHTML = `${this.fname} ${this.lname}`;
    }

    #show_balance(){
        let formatter = new Intl.NumberFormat('fr-FR', {style: 'currency',currency: 'AZN'});
        document.querySelector("#balance").innerHTML = formatter.format(this.balance);
    }

    #show_account(){
        document.querySelector("#account").innerHTML = this.account;
    }

    #recent_transactions(){
        document.querySelector("#recent_transactions").innerHTML="";
        this.recent_transactions.forEach(val=>{
            document.querySelector("#recent_transactions").innerHTML += `<li class="list-group-item ${val.operation == "-"? "text-danger": "text-success"} d-flex justify-content-between"><div>${val.time}</div><div class="text-right">${val.operation} ${val.amount}</div></li>`;
        })
    }

    show_info(){
        this.#show_full_name();
        this.#show_account();
        this.#show_balance();
        this.#recent_transactions();
    }
}


let card = new Card('mehin', 'melikova');
