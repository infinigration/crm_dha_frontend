export const programOptions = (programs) => {
  programs && programs.length > 0
    ? programs.map((p) => ({
        value: p._id,
        label: p.generalInformation[0].country,
      }))
    : "";
};
