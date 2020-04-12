<template>
    <main>
        <div id="content">
            <h1>Header</h1>
            <h2>Header</h2>
            <h3>Header</h3>
            <h4>Header</h4>
            <h5>Header</h5>
            <h6>Header</h6>
            <p>Paragraph</p>
            <a href="#">Link</a>
            <blockquote>
                block quote
            </blockquote>
            <code>
                code
                code
                code
            </code>
            <ul>
                <li>ul li 1</li>
                <li>ul li 2</li>
            </ul>
            <ol>
                <li>ol li 1</li>
                <li>ol li 2</li>
            </ol>
            <pre>
                <code>lol in code</code>
            </pre>
            <table>
                <tr>
                    <th>th1</th>
                    <th>th2</th>
                    <th>th3</th>
                </tr>
                <tr>
                    <td>td</td>
                    <td>td</td>
                    <td>td</td>
                </tr>
                <tr>
                    <td>td</td>
                    <td>td</td>
                    <td>td</td>
                </tr>
            </table>
            <h1>Header</h1>
            <h2>Header</h2>
            <h3>Header</h3>
            <h4>Header</h4>
            <h5>Header</h5>
            <h6>Header</h6>
            <p>Paragraph</p>
            <a href="#">Link</a>
            <blockquote>
                block quote
            </blockquote>
            <code>
                code
                code
                code
            </code>
            <ul>
                <li>ul li 1</li>
                <li>ul li 2</li>
            </ul>
            <ol>
                <li>ol li 1</li>
                <li>ol li 2</li>
            </ol>
            <pre>
                <code>lol in code</code>
            </pre>
            <table>
                <tr>
                    <th>th1</th>
                    <th>th2</th>
                    <th>th3</th>
                </tr>
                <tr>
                    <td>td</td>
                    <td>td</td>
                    <td>td</td>
                </tr>
                <tr>
                    <td>td</td>
                    <td>td</td>
                    <td>td</td>
                </tr>
            </table>
            <h1>Header</h1>
            <h2>Header</h2>
            <h3>Header</h3>
            <h4>Header</h4>
            <h5>Header</h5>
            <h6>Header</h6>
            <p>Paragraph</p>
            <a href="#">Link</a>
            <blockquote>
                block quote
            </blockquote>
            <code>
                code
                code
                code
            </code>
            <ul>
                <li>ul li 1</li>
                <li>ul li 2</li>
            </ul>
            <ol>
                <li>ol li 1</li>
                <li>ol li 2</li>
            </ol>
            <pre>
                <code>lol in code</code>
            </pre>
            <table>
                <tr>
                    <th>th1</th>
                    <th>th2</th>
                    <th>th3</th>
                </tr>
                <tr>
                    <td>td</td>
                    <td>td</td>
                    <td>td</td>
                </tr>
                <tr>
                    <td>td</td>
                    <td>td</td>
                    <td>td</td>
                </tr>
            </table>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'Doc',
    }
</script>

<style scoped>
    main {
        width: 100%;
        padding: 70px;
        overflow-y: scroll;
    }

    /* CONTENT */
    #content {
        padding-top: 10px;
        margin-bottom: 120px;
    }

    #content h1 {
        margin-top: 40px;
        font-size: 2.4em;
        border-bottom: 2px solid var(--light);
    }

    #content h1, #content h2, #content h3, #content h4, #content h5, #content h6, #content p{
        color: var(--dark);
    }

    #content h2 {
        font-size: 2em;
    }

    #content h3 {
        font-size: 1.4em;
    }

    #content h4 {
        font-size: 1.2em;
        color: var(--medium-two);
        font-weight: normal;
        padding-top: 0;
    }

    #content h5 {
        font-size: 1em;
    }

    #content h6 {
        font-size: 0.4em;
    }

    #content p, #content li {
        color: var(--medium);
        font-size: 17px;
        line-height: 1.7;
        font-weight: 400;
    }

    #content .callout {
        padding: 0;
        background-color: var(--light);
        border-left: 4px solid var(--accent);
        font-size: 22px;
        display: flex;
        border-radius: 5px;
    }

    #content .callout em {
        padding: 5px;
        height: 20px;
        width: 20px;
        color: var(--accent);
        border: 2px solid var(--accent);
        border-radius: 50%;
        text-align: center;
        float: left;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 10px;
    }

    #content .callout p {
        float: left;
        margin-left: 2px;
    }

    #content pre {
        padding: 10px;
        font-size: 16px;
        background-color: var(--light);
        color: var(--medium);
        border-radius: 5px;
        display: flex;
        align-items: center;
        width: fit-content;
    }

    #content pre code {
        font-weight: 200;
        width: fit-content;
        height: 100%;
    }

    #content ul, #content ol {
        padding-inline-start: 0;
    }

    #content ol {
        counter-reset: li;
    }

    #content ol li {
        counter-increment: li;
    }

    #content ul li:not(.task-list-item)::before, #content ol li::before {
        color: var(--accent);
    }

    #content ul li::before, #content ol li::before {
        display: inline-block;
        width: auto;
        font-size: 1em;
        margin-right: 8px;
    }

    #content ol li::before {
        content: counter(li) ".";
        margin-right: 8px;
    }

    #content ul li:not(.task-list-item)::before {
        content: "\2022";
    }

    #content ul li, #content ol li {
        line-height: 1.5;
        font-size: 1em;
        list-style-type: none;
    }

    #content ul li *, #content ol li * {
        display: inline;
    }

    #content a {
        text-decoration: none;
        color: var(--accent);
    }

    #content a:hover {
        text-decoration: underline;
        text-underline-color: var(--accent);
    }

    #content blockquote {
        margin-top: 40px;
        margin-bottom: 40px;
        margin-inline-start: 0;
    }

    #content blockquote::before {
        color: var(--medium-two);
        content: open-quote;
        font-size: 4em;
        line-height: 0.1em;
        vertical-align: -0.2em;
    }

    #content blockquote p {
        color: var(--medium-two);
        font-family: sans-serif;
        font-size: 1.2em;
        display: inline;
    }

    #content table {
        color: var(--dark);
        width: 85%;
        border-collapse: collapse; border-spacing: 0;
    }

    #content td, th {
        border: 1px solid var(--almost-dark);
        height: 35px;
    }

    #content th {
        background: var(--medium-two);
        font-weight: bold;
        padding: 10px;
        color: var(--light);
    }

    #content td {
        background: var(--light);
        text-align: center;
        padding: 10px;
    }

    @media screen and (max-width: 500px) {
        main {
            padding: 30px;
        }

        #content {
            padding-top: 30px;
        }
    }
</style>