class indexPage{
    #peopleNum = 1;
    #human = [];
    #penalty = [];

    mainPage = document.querySelector("#main-page");

    constructor() {
        this.#showMain();
    }

    #showMain() {
        document.querySelector("#main-submit").onclick = () => {
            this.#peopleNum = Number(document.querySelector("#people-num").innerHTML);
            this.#showWrite();
        };
        document.querySelector('#min-btn').onclick = () => {
            if(this.#peopleNum  <= 1) {
                alert('1명 이상은 지정해 주셔야 해요.');
                return;
            }
            document.querySelector('#people-num').innerHTML = --this.#peopleNum ;
        };

        document.querySelector('#plus-btn').onclick = () => {
            document.querySelector('#people-num').innerHTML = ++this.#peopleNum ;
        };
    }

    #showWrite() {
        this.mainPage.innerHTML = "";
        
        const humanArea = this.#addTitle({
            target: this.mainPage, 
            id: "human-area",
            text: "사용자명"
        });
        const penaltyArea = this.#addTitle({
            target: this.mainPage, 
            id: "penalty-area",
            text: "벌칙명"
        });

        for(let i = 0; i < this.#peopleNum; i++) {
            const inputBox = `<input type="text"/>`;
            penaltyArea.innerHTML += inputBox;
            humanArea.innerHTML += inputBox;
        }
        this.mainPage.innerHTML += `<input type="button" class="submit-btn" id="write-submit" value="시작!">`;

        const writeSubmit = document.querySelector("#write-submit");
        writeSubmit.onclick = async () => {
            try {
                await this.checkEmpty(document.querySelector("#human-area"));
                await this.checkEmpty(document.querySelector("#penalty-area"));
                this.#human = this.#setValue(document.querySelector("#human-area"));
                this.#penalty = this.#setValue(document.querySelector("#penalty-area"));
            } catch(e) {
                console.log(e)
                alert('빈칸을 모두 입력해주세요!');
                return;
            }

            this.#drawLadder();
        };    
    }

    #drawLadder() {
        
        const mainPage = document.querySelector("#main-page");
        mainPage.innerHTML = `
            <table id="main-table">
                <thead><tr></tr></thead>
                <tbody></tbody>
                <tfoot><tr></tr></tfoot>
            </table>
        `;

        // const mainTable = document.querySelector("#main-table");
        const humanArea = document.querySelector("#main-table thead tr");
        const penaltyArea = document.querySelector("#main-table tfoot tr");

        for(let i = 0, len = this.#human.length; i < len; i++) {
            let isblank = false;
            if(i < len - 1) {
                isblank = true;
            }
            this.#setTd(this.#human[i], humanArea, isblank);
            this.#setTd(this.#penalty[i], penaltyArea, isblank);
        }

        const ladderArea = document.querySelector("#main-table tbody");
        for(let i = 0; i < 20; i++) {
            let flag = false;
            const ladderTag = document.createElement("tr");
            for(let j = 0, len = (this.#human.length * 2) - 1; j < len; j++) {
                const tmp = document.createElement("td");
                if(j % 2 === 0) {
                    tmp.textContent = "|";
                } else {
                    if(Math.floor(Math.random() * 3) !== 0) {
                        if(!flag) {
                            tmp.textContent = "───";
                        }
                        flag = !flag;
                    }
                }
                ladderTag.append(tmp);
                
            }
            ladderArea.append(ladderTag)
        }
    }

    #addTitle({target, id, text}) {
        const divTag = document.createElement("div");
        divTag.setAttribute("id", id);
        divTag.style.textAlign = "center";
        target.append(divTag);

        const h3Tag = document.createElement("h3");
        h3Tag.textContent = text;
        divTag.append(h3Tag);
        return divTag;
    }

    #setValue(target) {
        const temp = [];
        target.childNodes.forEach((element) => {
            if(element.value!== undefined) {
                temp.push(element.value);
            }
        });

        // Random
        const result = [];
        const len = temp.length;
        for(let i = len; i > 0; i--) {
            const random = Math.floor(Math.random() * i);
            result.push(temp.splice(random, 1)[0]);
        }
        return result;
    }

    #setTd (text, target, isblank) {
        const tmp = document.createElement("td");
        tmp.textContent = text;
        target.append(tmp);
        if(isblank) {
            const blankTag = document.createElement("td");
            target.append(blankTag);
        }
    }

    checkEmpty(target) {
        return new Promise((resolve, reject) => {
            target.childNodes.forEach((element) => {
                if(element.value === "" || element.value === null) {
                    reject(false);
                }
            });
            resolve(true);
        });
    }
};

new indexPage();