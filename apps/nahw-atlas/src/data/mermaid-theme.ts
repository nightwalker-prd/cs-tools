export const fullThemeConfig = {
  theme: 'base' as const,
  themeVariables: {
    primaryColor: '#1a3150',
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#1a3150',
    secondaryColor: '#FFF8E7',
    secondaryTextColor: '#1a3150',
    secondaryBorderColor: '#c5a253',
    tertiaryColor: '#FAF7F2',
    tertiaryTextColor: '#222222',
    tertiaryBorderColor: '#E8DFD4',
    lineColor: '#c5a253',
    textColor: '#222222',
    mainBkg: '#1a3150',
    nodeBorder: '#1a3150',
    clusterBkg: '#FAF7F2',
    titleColor: '#1a3150',
    edgeLabelBackground: '#FAF7F2',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '14px',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis' as const,
    padding: 12,
    nodeSpacing: 30,
    rankSpacing: 40,
  },
};

export const miniThemeConfig = {
  ...fullThemeConfig,
  themeVariables: {
    ...fullThemeConfig.themeVariables,
    fontSize: '11px',
  },
  flowchart: {
    ...fullThemeConfig.flowchart,
    padding: 8,
    nodeSpacing: 20,
    rankSpacing: 30,
  },
};

export const detailThemeConfig = {
  ...fullThemeConfig,
  themeVariables: {
    ...fullThemeConfig.themeVariables,
    primaryColor: '#11253e',
    secondaryColor: '#fff7e1',
    tertiaryColor: '#f8f3eb',
    lineColor: '#b8903c',
    fontSize: '15px',
  },
  flowchart: {
    ...fullThemeConfig.flowchart,
    curve: 'cardinal' as const,
    padding: 18,
    nodeSpacing: 40,
    rankSpacing: 52,
  },
};

export const classDefs = `
  classDef category fill:#1a3150,color:#fff,stroke:#1a3150,stroke-width:2px
  classDef subtopic fill:#FFF8E7,color:#1a3150,stroke:#c5a253,stroke-width:2px
  classDef topic fill:#FAF7F2,color:#222,stroke:#E8DFD4,stroke-width:1px
  classDef rule fill:#fff,color:#1a3150,stroke:#c5a253,stroke-width:1px,stroke-dasharray:5 5`;
