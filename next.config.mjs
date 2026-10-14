export default { images: { remotePatterns: [
  { hostname: 'images.unsplash.com' }, { hostname: 'images.pexels.com' },
  { hostname: 'img.freepik.com' }, { hostname: '**.magnific.com' }] }, typescript: {
    // !! ATENÇÃO !!
    // Permite que o build seja concluído com sucesso mesmo se o projeto tiver erros de tipo no TS.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Opcional: ignora erros de linting no build também, se necessário
    ignoreDuringBuilds: true,
  } };
