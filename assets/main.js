const Game = {
    cards: [],
    revealed: [],
    agreed: [],

    blocked: true,
    timeFlipCard: 600,

    loadGame() {
        const game = document.getElementById('game');

        const el = document.createElement('div');
        el.classList.add('loading');

        game.appendChild(el);

        el.innerHTML = 'Inicializando o jogo...';

        setTimeout(() => {
            el.innerHTML = 'Sorteando as cartas...';
        }, 2000);

        setTimeout(() => {
            el.innerHTML = 'Bora jogar!';
        }, 3000);

        setTimeout(() => {
            this.drawGame();
        }, 4000);
    },

    generateCards() {
        for (let i = 1; i <= 10; i++) {
            this.cards = [...this.cards, { id: i, image: `./assets/images/${i}.jpg`}];
        }

        for (let i = 1; i <= 10; i++) {
            this.cards = [...this.cards, { id: i, image: `./assets/images/${i}.jpg`}];
        }
    },

    shuffleCards(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }

        return a;
    },

    drawGame() {
        const element = document.getElementById("game");

        element.innerHTML = null;

        this.shuffleCards(this.cards).sort().map((card, index) => {
            const el = document.createElement('div');

            el.onclick = () => this.handleClick(index);
            el.classList.add('card');
            el.style.backgroundImage = `url(${card.image})`;

            element.appendChild(el);
        });

        this.blocked = false;
    },

    handleClick(index) {
        const elements = document.getElementsByClassName('card');
        const isSelected = this.revealed.filter(card => card.index === index);

        if (this.blocked || elements[index].classList.contains('agreed') || isSelected.length > 0) return;

        if (this.revealed.length <= 1) {
            this.revealed = [...this.revealed, { index, value: this.cards[index].id}];
            elements[index].classList.add('flip');
        }

        if (this.revealed.length === 2) {
            const isAgreed = this.revealed.reduce((_, c) => {
                const v = this.revealed.filter(v => v.value === c.value);
                return v.length === 2;
            }, []);

            if (isAgreed) {
                this.revealed.forEach(el => elements[el.index].classList.add('agreed'));
                this.agreed = [...this.agreed, ...this.revealed];
                this.revealed = [];

                this.checkEndGame();
                return;
            }

            this.blocked = true;

            setTimeout(() => {
                this.revealed.forEach(el => elements[el.index].classList.remove('flip'));
                this.revealed = [];
                this.blocked = false;
            }, this.timeFlipCard);
        }
    },

    checkEndGame() {
        if (this.cards.length === this.agreed.length) {
            setTimeout(() => {
                alert('End Game =D');
            }, 350);

            this.blocked = true;
        }
    },

    init() {
        this.loadGame();
        this.generateCards();
    }
}

Game.init();
