const fields = {
  //FILE HEADER
  OSTAID: {
    message: "Maximum length: 10 characters",
    valid: /^[ -~]{0,10}$/,
  },
  FTITLE: {
    message: "Maximum length: 80 characters",
    valid: /^[ -~\xA0-\xFF]{0,80}$/,
  },
  FSCLAS: {
    message: "Valid entries: T, S, C, R, U",
    valid: /^[TSCRUtscru ]?$/,
  },
  FSCLSY: {
    message: "Maximum length: 2 characters",
    valid: /^[ -~\xA0-\xFF]{0,2}$/,
  },
  FSCODE: {
    message: "Maximum length: 11 characters",
    valid: /^[ -~\xA0-\xFF]{0,11}$/,
  },
  FSCTLH: {
    message: "Maximum length: 2 characters",
    valid: /^[ -~\xA0-\xFF]{0,2}$/,
  },
  FSREL: {
    message: "Maximum length: 20 characters",
    valid: /^[ -~\xA0-\xFF]{0,20}$/,
  },
  FSDCTP: {
    message: "Valid entries: DD, DE, GD, GE, 0, X",
    valid: /^(DD|DE|GD|GE|0|X)$/,
  },
  FSDCDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  FSDCXM: {
    message: "Maximum length: 4 characters",
    valid: /^[ -~\xA0-\xFF]{0,4}$/,
  },
  FSDG: {
    message: "Valid entries: S, C, R",
    valid: /^[SCRscr ]?$/,
  },
  FSDGDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  FSCLTX: {
    message: "Maximum length: 43 characters",
    valid: /^[ -~\xA0-\xFF]{0,43}$/,
  },
  FSCATP: {
    message: "Valid entries: O, D, M",
    valid: /^[ODModm ]?$/,
  },
  FSCAUT: {
    message: "Maximum length: 40 characters",
    valid: /^[ -~\xA0-\xFF]{0,40}$/,
  },
  FSCRSN: {
    message: "Valid entries: A to H",
    valid: /^[A-Ha-h ]?$/,
  },
  FSSRDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  FSCTLN: {
    message: "Maximum length: 15 characters",
    valid: /^[ -~\xA0-\xFF]{0,15}$/,
  },
  FSCOP: {
    message: "Valid entries: 00000 to 99999",
    valid: /^\d{0,5}$/,
  },
  FSCPYS: {
    message: "Valid entries: 00000 to 99999",
    valid: /^\d{0,5}$/,
  },
  FBKGC: {
    message: "Valid entries: 000000 to FFFFFF",
    valid: /^[0-9A-F]{6}$/,
  },
  ONAME: {
    message: "Maximum length: 24 characters",
    valid: /^[ -~\xA0-\xFF]{0,24}$/,
  },
  OPHONE: {
    message: "Maximum length: 18 characters",
    valid: /^[ -~\xA0-\xFF]{0,18}$/,
  },

  //IMAGE SUBHEADER
  IID1: {
    message: "Maximum length: 10 characters",
    valid: /^[ -~]{0,10}$/,
  },
  IDATIM: {
    message: "Format: CCYYMMDDhhmmss",
    valid:
      /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])(0\d|1\d|2[0-3])(0\d|[1-5]\d)(0\d|[1-5]\d)$/,
  },
  TGTID: {
    message: "Maximum length: 17 characters",
    valid: /^[ -~]{0,17}$/,
  },
  IID2: {
    message: "Maximum length: 80 characters",
    valid: /^[ -~\xA0-\xFF]{0,80}$/,
  },
  ISCLAS: {
    message: "Valid entries: T, S, C, R, U",
    valid: /^[TSCRUtscru ]?$/,
  },
  ISCLSY: {
    message: "Maximum length: 2 characters",
    valid: /^[ -~\xA0-\xFF]{0,2}$/,
  },
  ISCODE: {
    message: "Maximum length: 11 characters",
    valid: /^[ -~\xA0-\xFF]{0,11}$/,
  },
  ISCTLH: {
    message: "Maximum length: 2 characters",
    valid: /^[ -~\xA0-\xFF]{0,2}$/,
  },
  ISREL: {
    message: "Maximum length: 20 characters",
    valid: /^[ -~\xA0-\xFF]{0,20}$/,
  },
  ISDCTP: {
    message: "Valid entries: DD, DE, GD, GE, 0, X",
    valid: /^(DD|DE|GD|GE|0|X)$/,
  },
  ISDCDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  ISDCXM: {
    message: "Maximum length: 4 characters",
    valid: /^[ -~\xA0-\xFF]{0,4}$/,
  },
  ISDG: {
    message: "Valid entries: S, C, R",
    valid: /^[SCRscr ]?$/,
  },
  ISDGDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  ISCLTX: {
    message: "Maximum length: 43 characters",
    valid: /^[ -~\xA0-\xFF]{0,43}$/,
  },
  ISCATP: {
    message: "Valid entries: O, D, M",
    valid: /^[ODModm ]?$/,
  },
  ISCAUT: {
    message: "Maximum length: 40 characters",
    valid: /^[ -~\xA0-\xFF]{0,40}$/,
  },
  ISCRSN: {
    message: "Valid entries: A to H",
    valid: /^[A-Ha-h ]?$/,
  },
  ISSRDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  ISCTLN: {
    message: "Maximum length: 15 characters",
    valid: /^[ -~\xA0-\xFF]{0,15}$/,
  },
  ISORCE: {
    message: "Maximum length: 42 characters",
    valid: /^[ -~\xA0-\xFF]{0,42}$/,
  },
  ICAT: {
    message: "Maximum length: 8 characters",
    valid: /^[ -~]{0,8}$/,
  },
  ICORDS: {
    message: "Valid entries: U, G, N, S, P, D",
    valid: /^[UGNSPDugnspd]?$/,
  },
  IGEOLO: {
    message: "Maximum length: 60 characters",
    valid: /^[ -~\xA0-\xFF]{0,60}$/,
  },
  ICOM: {
    message: "Maximum length: 120 characters",
    valid: /^[ -~\xA0-\xFF]{0,120}$/,
  },

  //GRAPHIC SUBHEADER
  SID: {
    message: "Maximum length: 10 characters",
    valid: /^[ -~]{0,10}$/,
  },
  SNAME: {
    message: "Maximum length: 20 characters",
    valid: /^[ -~\xA0-\xFF]{0,20}$/,
  },
  SSCLAS: {
    message: "Valid entries: T, S, C, R, U",
    valid: /^[TSCRUtscru ]?$/,
  },
  SSCLSY: {
    message: "Maximum length: 2 characters",
    valid: /^[ -~\xA0-\xFF]{0,2}$/,
  },
  SSCODE: {
    message: "Maximum length: 11 characters",
    valid: /^[ -~\xA0-\xFF]{0,11}$/,
  },
  SSCTLH: {
    message: "Maximum length: 2 characters",
    valid: /^[ -~\xA0-\xFF]{0,2}$/,
  },
  SSREL: {
    message: "Maximum length: 20 characters",
    valid: /^[ -~\xA0-\xFF]{0,20}$/,
  },
  SSDCTP: {
    message: "Valid entries: DD, DE, GD, GE, 0, X",
    valid: /^(DD|DE|GD|GE|0|X)$/,
  },
  SSDCDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  SSDCXM: {
    message: "Maximum length: 4 characters",
    valid: /^[ -~\xA0-\xFF]{0,4}$/,
  },
  SSDG: {
    message: "Valid entries: S, C, R",
    valid: /^[SCRscr ]?$/,
  },
  SSDGDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  SSCLTX: {
    message: "Maximum length: 43 characters",
    valid: /^[ -~\xA0-\xFF]{0,43}$/,
  },
  SSCATP: {
    message: "Valid entries: O, D, M",
    valid: /^[ODModm ]?$/,
  },
  SSCAUT: {
    message: "Maximum length: 40 characters",
    valid: /^[ -~\xA0-\xFF]{0,40}$/,
  },
  SSCRSN: {
    message: "Valid entries: A to H",
    valid: /^[A-Ha-h ]?$/,
  },
  SSSRDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  SSCTLN: {
    message: "Maximum length: 15 characters",
    valid: /^[ -~\xA0-\xFF]{0,15}$/,
  },
  SFMT: {
    message: "Maximum length: 1 character",
    valid: /^[ -~]?$/,
  },
  SSTRUCT: {
    message: "Valid entries: 0000000000000 to 9999999999999",
    valid: /^\d{0,13}$/,
  },
  SDLVL: {
    message: "Valid entries: 001 to 999",
    valid: /^\d{0,3}$/,
  },
  SALVL: {
    message: "Valid entries: 000 to 998",
    valid: /^\d{0,2}[0-8]$/,
  },
  SLOC: {
    message: "Format: RRRRRCCCCC",
    valid: /^\d{0,10}$/,
  },
  SBND1: {
    message: "Format: rrrrrccccc",
    valid: /^\d{0,10}$/,
  },
  SCOLOR: {
    message: "Valid entries: C, M",
    valid: /^[CMcm]?$/,
  },
  SBND2: {
    message: "Format: rrrrrccccc",
    valid: /^\d{0,10}$/,
  },
  SRES2: {
    message: "Valid entries: 00 to 99",
    valid: /^\d{0,2}$/,
  },

  //TEXT SUBHEADER
  TEXTID: {
    message: "Maximum length: 7 characters",
    valid: /^[ -~]{0,7}$/,
  },
  TXTALVL: {
    message: "Valid entries: 000 to 998",
    valid: /^\d{0,2}[0-8]$/,
  },
  TXTDT: {
    message: "Format: CCYYMMDDhhmmss",
    valid:
      /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])(0\d|1\d|2[0-3])(0\d|[1-5]\d)(0\d|[1-5]\d)$/,
  },
  TXTITL: {
    message: "Maximum length: 15 characters",
    valid: /^[ -~\xA0-\xFF]{0,15}$/,
  },
  TSCLAS: {
    message: "Valid entries: T, S, C, R, U",
    valid: /^[TSCRUtscru ]?$/,
  },
  TSCLSY: {
    message: "Maximum length: 2 characters",
    valid: /^[ -~\xA0-\xFF]{0,2}$/,
  },
  TSCODE: {
    message: "Maximum length: 11 characters",
    valid: /^[ -~\xA0-\xFF]{0,11}$/,
  },
  TSCTLH: {
    message: "Maximum length: 2 characters",
    valid: /^[ -~\xA0-\xFF]{0,2}$/,
  },
  TSREL: {
    message: "Maximum length: 20 characters",
    valid: /^[ -~\xA0-\xFF]{0,20}$/,
  },
  TSDCTP: {
    message: "Valid entries: DD, DE, GD, GE, 0, X",
    valid: /^(DD|DE|GD|GE|0|X)$/,
  },
  TSDCDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  TSDCXM: {
    message: "Maximum length: 4 characters",
    valid: /^[ -~\xA0-\xFF]{0,4}$/,
  },
  TSDG: {
    message: "Valid entries: S, C, R",
    valid: /^[SCRscr ]?$/,
  },
  TSDGDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  TSCLTX: {
    message: "Maximum length: 8 characters",
    valid: /^[ -~\xA0-\xFF]{0,8}$/,
  },
  TSCATP: {
    message: "Valid entries: O, D, M",
    valid: /^[ODModm ]?$/,
  },
  TSCAUT: {
    message: "Maximum length: 40 characters",
    valid: /^[ -~\xA0-\xFF]{0,40}$/,
  },
  TSCRSN: {
    message: "Valid entries: A to H",
    valid: /^[A-Ha-h ]?$/,
  },
  TSSRDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  TSCTLN: {
    message: "Maximum length: 40 characters",
    valid: /^[ -~\xA0-\xFF]{0,40}$/,
  },
  TXTFMT: {
    message: "Maximum length: 3 characters",
    valid: /^[ -~]{3}$/,
  },

  //DES SUBHEADER
  DESID: {
    message: "Maximum length: 25 characters",
    valid: /^[ -~]{0,25}$/,
  },
  DESVER: {
    message: "Valid entries: 09 to 99",
    valid: /^[01-9]\d$/,
  },
  DECLAS: {
    message: "Valid entries: T, C, R, S, U",
    valid: /^[TSCRUtscru ]?$/,
  },
  DECLSY: {
    message: "Maximum length: 2 characters",
    valid: /^[ -~\xA0-\xFF]{0,2}$/,
  },
  DESCODE: {
    message: "Maximum length: 11 characters",
    valid: /^[ -~\xA0-\xFF]{0,11}$/,
  },
  DESCTLH: {
    message: "Maximum length: 2 characters",
    valid: /^[ -~\xA0-\xFF]{0,2}$/,
  },
  DESREL: {
    message: "Maximum length: 20 characters",
    valid: /^[ -~\xA0-\xFF]{0,20}$/,
  },
  DESDCTP: {
    message: "Valid entries: DD, DE, GD, GE, 0, X",
    valid: /^(DD|DE|GD|GE|0|X)$/,
  },
  DESDCDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  DESDCXM: {
    message: "Maximum length: 4 characters",
    valid: /^[ -~\xA0-\xFF]{0,4}$/,
  },
  DESDG: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  DESDGDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  DESCLTX: {
    message: "Maximum length: 43 characters",
    valid: /^[ -~\xA0-\xFF]{0,43}$/,
  },
  DESCATP: {
    message: "Valid entries: O, D, M",
    valid: /^[ODModm ]?$/,
  },
  DESCAUT: {
    message: "Maximum length: 40 characters",
    valid: /^[ -~\xA0-\xFF]{0,40}$/,
  },
  DESCRSN: {
    message: "Valid entries: A to H",
    valid: /^[A-Ha-h ]?$/,
  },
  DESSRDT: {
    message: "Format: CCYYMMDD",
    valid: /^\d{4}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])$/,
  },
  DESCTLN: {
    message: "Maximum length: 15 characters",
    valid: /^[ -~\xA0-\xFF]{0,15}$/,
  },
};
export { fields };
