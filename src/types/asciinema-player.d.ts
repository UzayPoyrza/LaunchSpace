declare module 'asciinema-player' {
  export function create(
    src: string,
    element: HTMLElement,
    options?: Record<string, any>
  ): { dispose: () => void };
}

declare module 'asciinema-player/dist/bundle/asciinema-player.css';
