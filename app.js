new Vue ({
    el: '#app',
    data: {
        running: false,
        hunterLife: 100,
        monsterLife: 100,
        result: '',
        logs: []
    },
    computed: {
        checkResult(){
            return this.monsterLife == 0 || this.hunterLife == 0;
        }
    },
    methods: {
        startHunt() {
            this.running = true;
            this.monsterLife = 100;
            this.hunterLife = 100;
            this.logs = [];
        },

        attack(power) {
            this.damage('monsterLife', 5, 10, power, 'You hit the monster', 'hunter')
            if (this.monsterLife > 0) {
                this.damage('hunterLife', 7, 12, false, "Monster hit's you", 'monster')
            }
        },
        
        damage(atr, min, max, power, text, cls) {
            const plus = power ? 5 : 0;
            const damage = this.getRandom(min + plus, max + plus);
            this[atr] = Math.max(this[atr] - damage, 0);
            this.registerLog(`${text} with ${damage}!`, cls)
        },

        healAndAttack() {
            this.heal(10, 15, 'You healed', 'hunterHeal');
            this.damage('hunterLife', 7, 12, false, "Monster hit's you", 'monster')
        },
        
        heal(min, max, text, cls) {
            const heal = this.getRandom(min, max)
            this.hunterLife = Math.min(this.hunterLife + heal, 100)
            this.registerLog(`${text} ${heal}!`, cls)
        },     

        getRandom(min, max) {
            const value = Math.random() * (max - min) + min;
            return Math.round(value)
        },

        registerLog(msg, cls) {
            this.logs.unshift({ msg, cls })
        }

    },
    watch: {
        checkResult(value) {
            if (value) {
                this.running = false;
                this.logs = [];
            }
        }
    }
})