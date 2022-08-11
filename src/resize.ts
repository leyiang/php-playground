export const initResize = (resize: HTMLElement, el: HTMLElement, el1: HTMLElement) => {
    let dragging = false, start = 0, rect: DOMRect | null = null;

    resize.addEventListener("mousedown", (e) => {
        rect = el.getBoundingClientRect();

        dragging = true;
        start = e.clientY;
    });

    window.addEventListener("mousemove", e => {
        let originHeight = rect?.height as number;

        if( dragging ) {
            el.style.pointerEvents = "none";
            el1.style.pointerEvents = "none";

            let dy = e.clientY - start;
            let height = originHeight + dy;

            if( height < 130 ) height = 130;

            el.classList.remove("flex-1");
            el.style.height = height + "px";
        }
    });

    window.addEventListener("mouseup", e => {
        dragging = false;

        el.style.removeProperty("pointer-events");
        el1.style.removeProperty("pointer-events");
    });
}