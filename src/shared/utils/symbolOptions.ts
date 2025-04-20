export interface SymbolOption {
  value: string;
  label: string;
}

export const symbolOptions: SymbolOption[] = [
  {
    value: `
        M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9
        C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3
        c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9
        A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2
  
        M7 17
        m-2,0
        a2,2 0 1,0 4,0
        a2,2 0 1,0 -4,0
  
        M9 17h6
  
        M17 17
        m-2,0
        a2,2 0 1,0 4,0
        a2,2 0 1,0 -4,0
      `,
    label: "Araba",
  },
  {
    value:
      "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    label: "Kalp",
  },
  {
    value:
      "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
    label: "Lokasyon",
  },
  {
    value: "M3 11 L22 2 L13 21 L11 13 L3 11 Z",
    label: "Navigasyon",
  },
];
