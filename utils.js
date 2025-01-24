export function ToSpans(elems){
    const Elements  = document.querySelectorAll(elems)
    if(!Elements || Elements?.length == 0) return;

    Elements.forEach(Elm => {
        const Text = Elm.textContent;
        Elm.innerHTML = ''
        const Spans = Text.split('').map(t => {
            const span = document.createElement('span')
            span.innerHTML = t == ' ' ? '&nbsp;' : t;
            return span
        })
        Elm.append(...Array.from(Spans))
    })
    return Elements
}