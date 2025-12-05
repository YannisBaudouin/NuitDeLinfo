class MonHeader extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
        <style>
            header {
            background-color: var(--prussian-blue);
            color: var(--text);
            overflow: hidden;
            padding: 14px 10px;
        }

        header a {
            float: left;
            color: var(--text-whit);
            text-align: center;
            padding: 12px;
            text-decoration: none;
            font-size: 18px;
            line-height: 25px;
            border-radius: 4px;
        }

        .header-right {
            float: right;
            padding-right: 10%;
        }

        header a.logo {
            font-size: 25px;
            font-weight: bold;
        }

        </style>

        <header style="position: fixed; width: 100%;">
            <a href="#default" class="logo">[ LOGO ]</a>
            <div class="header-right">
                <a class="active" href="#home">Home</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>
        </header>
    `;
    }
}

// Déclarer avec la balise <mon-header>
customElements.define("mon-header", MonHeader);
