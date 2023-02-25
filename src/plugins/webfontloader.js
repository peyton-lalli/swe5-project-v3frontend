export async function loadFonts() {
  const webFontLoader = await import("webfontloader");

  webFontLoader.load({
    google: {
      families: ["Inter:100,200,300,400,500,600,700,800,900"],
    },
  });
}
