const registerComponents = requireContext => {
  let vueCompsPath = [];
  requireContext.keys().forEach(comp => {
    let vueComp = comp;
    vueComp = vueComp.replace('./', '');
    vueCompsPath.push(vueComp);
  });
  return vueCompsPath;
};

export const vueCompsInstall = vue => {
  const vueCompsPath = registerComponents(
    require.context('@/components/common', false, /\.vue$/)
  );

  const vueComps = [];

  for (let i = 0, l = vueCompsPath.length; i < l; i++) {
    vueComps.push(require(`@/components/common/${vueCompsPath[i]}`));
  }

  for (let i = 0, l = vueComps.length; i < l; i++) {
    if (vueComps[i].default.name) {
      vue.component(vueComps[i].default.name, vueComps[i].default);
    }
  }
};
