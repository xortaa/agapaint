export const forReleasePartialPayment = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="https://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--[if !mso]><! -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="email=no" />
    <meta name="x-apple-disable-message-reformatting" />
    <link
      href="https://fonts.googleapis.com/css?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900"
      rel="stylesheet" />
    <link
      href="https://fonts.googleapis.com/css?family=Poppins:ital,wght@0,100;1,100;0,200;1,200;0,300;1,300;0,400;1,400;0,500;1,500;0,600;1,600;0,700;1,700;0,800;1,800;0,900;1,900"
      rel="stylesheet" />
    <title>Agapaint Email Template</title>
    <style>
      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        min-height: 100% !important;
        width: 100% !important;
        -webkit-font-smoothing: antialiased;
      }

      * {
        -ms-text-size-adjust: 100%;
      }

      #outlook a {
        padding: 0;
      }

      .ReadMsgBody,
      .ExternalClass {
        width: 100%;
      }

      .ExternalClass,
      .ExternalClass p,
      .ExternalClass td,
      .ExternalClass div,
      .ExternalClass span,
      .ExternalClass font {
        line-height: 100%;
      }

      div[style*="margin: 14px 0"],
      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      table,
      td,
      th {
        mso-table-lspace: 0 !important;
        mso-table-rspace: 0 !important;
        border-collapse: collapse;
      }

      body,
      td,
      th,
      p,
      div,
      li,
      a,
      span {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        mso-line-height-rule: exactly;
      }

      img {
        border: 0;
        outline: none;
        line-height: 100%;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
      }

      .pc-gmail-fix {
        display: none;
        display: none !important;
      }

      @media (min-width: 621px) {
        .pc-lg-hide {
          display: none;
        }

        .pc-lg-bg-img-hide {
          background-image: none !important;
        }
      }
    </style>
    <style>
      @media (max-width: 620px) {
        .pc-project-body {
          min-width: 0px !important;
        }
        .pc-project-container {
          width: 100% !important;
        }
        .pc-sm-hide {
          display: none !important;
        }
        .pc-sm-bg-img-hide {
          background-image: none !important;
        }
        .pc-w620-padding-20-0-20-0 {
          padding: 20px 0px 20px 0px !important;
        }
        .pc-w620-padding-8-0 {
          padding-top: 4px !important;
          padding-bottom: 4px !important;
        }
        .pc-w620-valign-middle {
          vertical-align: middle !important;
        }
        td.pc-w620-halign-center {
          text-align: center !important;
        }
        table.pc-w620-halign-center {
          float: none !important;
          margin-right: auto !important;
          margin-left: auto !important;
        }
        img.pc-w620-halign-center {
          margin-right: auto !important;
          margin-left: auto !important;
        }
        .pc-w620-valign-top {
          vertical-align: top !important;
        }
        .pc-w620-padding-0-24 {
          padding-left: 12px !important;
          padding-right: 12px !important;
        }
        div.pc-w620-align-center,
        th.pc-w620-align-center,
        a.pc-w620-align-center,
        td.pc-w620-align-center {
          text-align: center !important;
          text-align-last: center !important;
        }
        table.pc-w620-align-center {
          float: none !important;
          margin-right: auto !important;
          margin-left: auto !important;
        }
        img.pc-w620-align-center {
          margin-right: auto !important;
          margin-left: auto !important;
        }
        .pc-w620-padding-20-30-0-30 {
          padding: 20px 30px 0px 30px !important;
        }
        table.pc-w620-spacing-0-0-0-0 {
          margin: 0px 0px 0px 0px !important;
        }
        td.pc-w620-spacing-0-0-0-0,
        th.pc-w620-spacing-0-0-0-0 {
          margin: 0 !important;
          padding: 0px 0px 0px 0px !important;
        }
        .pc-w620-padding-30-0 {
          padding-top: 15px !important;
          padding-bottom: 15px !important;
        }
        .pc-w620-padding-0-0-0-0 {
          padding: 0px 0px 0px 0px !important;
        }
        .pc-w620-padding-32-0-32-0 {
          padding: 32px 0px 32px 0px !important;
        }
        .pc-w620-width-fill {
          width: 100% !important;
        }
        table.pc-w620-spacing-0-0-16-0 {
          margin: 0px 0px 16px 0px !important;
        }
        td.pc-w620-spacing-0-0-16-0,
        th.pc-w620-spacing-0-0-16-0 {
          margin: 0 !important;
          padding: 0px 0px 16px 0px !important;
        }
        .pc-w620-width-226 {
          width: 226px !important;
        }
        a.pc-w620-width-226 {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .pc-w620-height-auto {
          height: auto !important;
        }
        .pc-w620-fontSize-34px {
          font-size: 34px !important;
        }
        .pc-w620-lineHeight-100pc {
          line-height: 100% !important;
        }
        table.pc-w620-spacing-0-24-12-24 {
          margin: 0px 24px 12px 24px !important;
        }
        td.pc-w620-spacing-0-24-12-24,
        th.pc-w620-spacing-0-24-12-24 {
          margin: 0 !important;
          padding: 0px 24px 12px 24px !important;
        }
        .pc-w620-fontSize-14px {
          font-size: 14px !important;
        }
        table.pc-w620-spacing-0-24-24-24 {
          margin: 0px 24px 24px 24px !important;
        }
        td.pc-w620-spacing-0-24-24-24,
        th.pc-w620-spacing-0-24-24-24 {
          margin: 0 !important;
          padding: 0px 24px 24px 24px !important;
        }
        .pc-w620-padding-10-0 {
          padding-top: 5px !important;
          padding-bottom: 5px !important;
        }
        .pc-w620-padding-0-4 {
          padding-left: 2px !important;
          padding-right: 2px !important;
        }
        .pc-w620-dir-ltr {
          direction: ltr !important;
        }
        table.pc-w620-spacing-0-16-40-16 {
          margin: 0px 16px 40px 16px !important;
        }
        td.pc-w620-spacing-0-16-40-16,
        th.pc-w620-spacing-0-16-40-16 {
          margin: 0 !important;
          padding: 0px 16px 40px 16px !important;
        }
        .pc-w620-fontSize-16px {
          font-size: 16px !important;
        }
        .pc-w620-padding-12-24-12-24 {
          padding: 12px 24px 12px 24px !important;
        }
        .pc-w620-width-300 {
          width: 300px !important;
        }
        a.pc-w620-width-300 {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .pc-w620-fontSize-12px {
          font-size: 12px !important;
        }
        .pc-w620-padding-0-30-0-30 {
          padding: 0px 30px 0px 30px !important;
        }
        .pc-w620-width-100pc {
          width: 100% !important;
        }
        a.pc-w620-width-100pc {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .pc-w620-padding-20-0-0-0 {
          padding: 20px 0px 0px 0px !important;
        }
        table.pc-w620-spacing-0-0-10-0 {
          margin: 0px 0px 10px 0px !important;
        }
        td.pc-w620-spacing-0-0-10-0,
        th.pc-w620-spacing-0-0-10-0 {
          margin: 0 !important;
          padding: 0px 0px 10px 0px !important;
        }
        .pc-w620-fontSize-32px {
          font-size: 32px !important;
        }
        .pc-w620-lineHeight-40 {
          line-height: 40px !important;
        }
        table.pc-w620-spacing-0-0-4-0 {
          margin: 0px 0px 4px 0px !important;
        }
        td.pc-w620-spacing-0-0-4-0,
        th.pc-w620-spacing-0-0-4-0 {
          margin: 0 !important;
          padding: 0px 0px 4px 0px !important;
        }
        div.pc-w620-align-left,
        th.pc-w620-align-left,
        a.pc-w620-align-left,
        td.pc-w620-align-left {
          text-align: left !important;
          text-align-last: left !important;
        }
        table.pc-w620-align-left {
          float: none !important;
          margin-right: auto !important;
          margin-left: 0 !important;
        }
        img.pc-w620-align-left {
          margin-right: auto !important;
          margin-left: 0 !important;
        }
        .pc-w620-lineHeight-120pc {
          line-height: 120% !important;
        }
        td.pc-w620-halign-left {
          text-align: left !important;
        }
        table.pc-w620-halign-left {
          float: none !important;
          margin-right: auto !important;
          margin-left: 0 !important;
        }
        img.pc-w620-halign-left {
          margin-right: auto !important;
          margin-left: 0 !important;
        }
        .pc-w620-padding-20-0-20-20 {
          padding: 20px 0px 20px 20px !important;
        }
        .pc-w620-view-vertical,
        .pc-w620-view-vertical > tbody,
        .pc-w620-view-vertical > tbody > tr,
        .pc-w620-view-vertical > tbody > tr > th,
        .pc-w620-view-vertical > tr,
        .pc-w620-view-vertical > tr > th {
          display: inline-block;
          width: 100% !important;
        }
        .pc-w620-padding-8-0-0-0 {
          padding: 8px 0px 0px 0px !important;
        }
        .pc-w620-fontSize-16 {
          font-size: 16px !important;
        }
        .pc-w620-lineHeight-26 {
          line-height: 26px !important;
        }
        td.pc-w620-halign-right {
          text-align: right !important;
        }
        table.pc-w620-halign-right {
          float: none !important;
          margin-right: 0 !important;
          margin-left: auto !important;
        }
        img.pc-w620-halign-right {
          margin-right: 0 !important;
          margin-left: auto !important;
        }
        .pc-w620-padding-0-0-0-40 {
          padding: 0px 0px 0px 40px !important;
        }
        .pc-w620-lineHeight-20 {
          line-height: 20px !important;
        }
        div.pc-w620-align-right,
        th.pc-w620-align-right,
        a.pc-w620-align-right,
        td.pc-w620-align-right {
          text-align: right !important;
          text-align-last: right !important;
        }
        table.pc-w620-align-right {
          float: none !important;
          margin-left: auto !important;
          margin-right: 0 !important;
        }
        img.pc-w620-align-right {
          margin-right: 0 !important;
          margin-left: auto !important;
        }
        .pc-w620-padding-5-0-0-40 {
          padding: 5px 0px 0px 40px !important;
        }
        .pc-w620-lineHeight-24 {
          line-height: 24px !important;
        }
        table.pc-w620-spacing-0-0-0-40 {
          margin: 0px 0px 0px 40px !important;
        }
        td.pc-w620-spacing-0-0-0-40,
        th.pc-w620-spacing-0-0-0-40 {
          margin: 0 !important;
          padding: 0px 0px 0px 40px !important;
        }
        table.pc-w620-spacing-0-0-2-0 {
          margin: 0px 0px 2px 0px !important;
        }
        td.pc-w620-spacing-0-0-2-0,
        th.pc-w620-spacing-0-0-2-0 {
          margin: 0 !important;
          padding: 0px 0px 2px 0px !important;
        }
        table.pc-w620-spacing-20-0-0-0 {
          margin: 20px 0px 0px 0px !important;
        }
        td.pc-w620-spacing-20-0-0-0,
        th.pc-w620-spacing-20-0-0-0 {
          margin: 0 !important;
          padding: 20px 0px 0px 0px !important;
        }
        .pc-w620-fontSize-20px {
          font-size: 20px !important;
        }
        .pc-w620-padding-32-24-0-24 {
          padding: 32px 24px 0px 24px !important;
        }
        .pc-w620-padding-40-24-40-24 {
          padding: 40px 24px 40px 24px !important;
        }
        .pc-w620-lineHeight-130pc {
          line-height: 130% !important;
        }
        .pc-w620-fontSize-18px {
          font-size: 18px !important;
        }
        .pc-w620-padding-32-24-32-24 {
          padding: 32px 24px 32px 24px !important;
        }

        .pc-w620-width-hug {
          width: auto !important;
        }
        .pc-w620-padding-40-32-40-32 {
          padding: 40px 32px 40px 32px !important;
        }
        .pc-w620-padding-0-20 {
          padding-left: 10px !important;
          padding-right: 10px !important;
        }
        .pc-w620-padding-35-35-35-35 {
          padding: 35px 35px 35px 35px !important;
        }

        .pc-w620-gridCollapsed-1 > tbody,
        .pc-w620-gridCollapsed-1 > tbody > tr,
        .pc-w620-gridCollapsed-1 > tr {
          display: inline-block !important;
        }
        .pc-w620-gridCollapsed-1.pc-width-fill > tbody,
        .pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr,
        .pc-w620-gridCollapsed-1.pc-width-fill > tr {
          width: 100% !important;
        }
        .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody,
        .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr,
        .pc-w620-gridCollapsed-1.pc-w620-width-fill > tr {
          width: 100% !important;
        }
        .pc-w620-gridCollapsed-1 > tbody > tr > td,
        .pc-w620-gridCollapsed-1 > tr > td {
          display: block !important;
          width: auto !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr > td,
        .pc-w620-gridCollapsed-1.pc-width-fill > tr > td {
          width: 100% !important;
        }
        .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr > td,
        .pc-w620-gridCollapsed-1.pc-w620-width-fill > tr > td {
          width: 100% !important;
        }
        .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-first > .pc-grid-td-first,
        pc-w620-gridCollapsed-1 > .pc-grid-tr-first > .pc-grid-td-first {
          padding-top: 0 !important;
        }
        .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-last > .pc-grid-td-last,
        pc-w620-gridCollapsed-1 > .pc-grid-tr-last > .pc-grid-td-last {
          padding-bottom: 0 !important;
        }

        .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-first > td,
        .pc-w620-gridCollapsed-0 > .pc-grid-tr-first > td {
          padding-top: 0 !important;
        }
        .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-last > td,
        .pc-w620-gridCollapsed-0 > .pc-grid-tr-last > td {
          padding-bottom: 0 !important;
        }
        .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-first,
        .pc-w620-gridCollapsed-0 > tr > .pc-grid-td-first {
          padding-left: 0 !important;
        }
        .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-last,
        .pc-w620-gridCollapsed-0 > tr > .pc-grid-td-last {
          padding-right: 0 !important;
        }

        .pc-w620-tableCollapsed-1 > tbody,
        .pc-w620-tableCollapsed-1 > tbody > tr,
        .pc-w620-tableCollapsed-1 > tr {
          display: block !important;
        }
        .pc-w620-tableCollapsed-1.pc-width-fill > tbody,
        .pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr,
        .pc-w620-tableCollapsed-1.pc-width-fill > tr {
          width: 100% !important;
        }
        .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody,
        .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr,
        .pc-w620-tableCollapsed-1.pc-w620-width-fill > tr {
          width: 100% !important;
        }
        .pc-w620-tableCollapsed-1 > tbody > tr > td,
        .pc-w620-tableCollapsed-1 > tr > td {
          display: block !important;
          width: auto !important;
        }
        .pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr > td,
        .pc-w620-tableCollapsed-1.pc-width-fill > tr > td {
          width: 100% !important;
        }
        .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr > td,
        .pc-w620-tableCollapsed-1.pc-w620-width-fill > tr > td {
          width: 100% !important;
        }
      }
      @media (max-width: 520px) {
        .pc-w520-padding-30-30-30-30 {
          padding: 30px 30px 30px 30px !important;
        }
      }
    </style>
    <!--[if !mso]><! -->
    <style>
      @media all {
        @font-face {
          font-family: "Urbanist";
          font-style: normal;
          font-weight: 900;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDYhkvH5mq.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: normal;
          font-weight: 100;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDyx8vH5mq.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: normal;
          font-weight: 700;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDLBkvH5mq.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: italic;
          font-weight: 400;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA133VammY8A.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: italic;
          font-weight: 500;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA13FVammY8A.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: italic;
          font-weight: 900;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA11eUqmmY8A.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: normal;
          font-weight: 600;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDFRkvH5mq.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: italic;
          font-weight: 200;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA113VammY8A.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: italic;
          font-weight: 100;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA133VKmmY8A.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: italic;
          font-weight: 800;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA113UqmmY8A.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: normal;
          font-weight: 400;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDyx4vH5mq.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: normal;
          font-weight: 500;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqD-R4vH5mq.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: normal;
          font-weight: 800;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDSxkvH5mq.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: normal;
          font-weight: 300;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDlR4vH5mq.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: italic;
          font-weight: 700;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA10QUqmmY8A.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: italic;
          font-weight: 300;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA12pVammY8A.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: normal;
          font-weight: 200;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDSx4vH5mq.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Urbanist";
          font-style: italic;
          font-weight: 600;
          src: url("https://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA10pUqmmY8A.woff2")
            format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 100;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrLPTufntA.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 200;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLFj_Z1JlFQ.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: italic;
          font-weight: 100;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiAyp8kv8JHgFVrJJLmE0tMMPI.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: italic;
          font-weight: 200;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmv1pVGdeO.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: italic;
          font-weight: 300;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm21lVGdeO.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 300;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8Z1JlFQ.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: italic;
          font-weight: 400;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrJJLufntA.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: italic;
          font-weight: 500;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmg1hVGdeO.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: italic;
          font-weight: 600;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmr19VGdeO.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: italic;
          font-weight: 900;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm81xVGdeO.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 500;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1JlFQ.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 400;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJnecg.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 900;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5Z1JlFQ.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: italic;
          font-weight: 800;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm111VGdeO.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 600;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1JlFQ.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 700;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1JlFQ.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: italic;
          font-weight: 700;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmy15VGdeO.woff2") format("woff2");
        }
        @font-face {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 800;
          src: url("https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4Z1JlFQ.woff2") format("woff2");
        }
      }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
      <style type="text/css">
        .pc-font-alt {
          font-family: Arial, Helvetica, sans-serif !important;
        }
      </style>
    <![endif]-->
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
  </head>

  <body
    class="pc-font-alt"
    style="
      width: 100% !important;
      min-height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.5;
      color: #2d3a41;
      mso-line-height-rule: exactly;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      font-variant-ligatures: normal;
      text-rendering: optimizeLegibility;
      -moz-osx-font-smoothing: grayscale;
      background-color: #e8ecf0;
    "
    bgcolor="#e8ecf0">
    <table
      class="pc-project-body"
      style="table-layout: fixed; min-width: 600px; background-color: #e8ecf0"
      bgcolor="#e8ecf0"
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      role="presentation">
      <tr>
        <td align="center" valign="top">
          <table
            class="pc-project-container"
            style="width: 600px; max-width: 600px"
            width="600"
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation">
            <tr>
              <td class="pc-w620-padding-20-0-20-0" style="padding: 20px 0px 20px 0px" align="left" valign="top">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%">
                  <tr>
                    <td valign="top">
                      <!-- BEGIN MODULE: Menu -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                        <tr>
                          <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                              <tr>
                                <td
                                  valign="top"
                                  class="pc-w620-padding-20-30-0-30"
                                  style="
                                    padding: 20px 32px 20px 32px;
                                    border-radius: 2px 2px 0px 0px;
                                    background-color: transparent;
                                  "
                                  bgcolor="transparent">
                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td class="pc-w620-valign-middle pc-w620-halign-center">
                                        <table
                                          class="pc-width-fill pc-w620-gridCollapsed-1 pc-w620-halign-center"
                                          width="100%"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation">
                                          <tr class="pc-grid-tr-first pc-grid-tr-last">
                                            <td
                                              class="pc-grid-td-first pc-grid-td-last pc-w620-padding-8-0"
                                              align="center"
                                              valign="middle"
                                              style="
                                                padding-top: 0px;
                                                padding-right: 0px;
                                                padding-bottom: 0px;
                                                padding-left: 0px;
                                              ">
                                              <table
                                                width="100%"
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="width: 100%">
                                                <tr>
                                                  <td
                                                    class="pc-w620-halign-center pc-w620-valign-top"
                                                    align="center"
                                                    valign="top">
                                                    <table
                                                      class="pc-w620-halign-center"
                                                      align="center"
                                                      width="100%"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="width: 100%">
                                                      <tr>
                                                        <td class="pc-w620-halign-center" align="center" valign="top">
                                                          <table
                                                            class="pc-w620-halign-center"
                                                            align="center"
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            role="presentation">
                                                            <tr>
                                                              <td
                                                                class="pc-w620-valign-top pc-w620-halign-center"
                                                                align="left">
                                                                <table
                                                                  class="pc-width-hug pc-w620-gridCollapsed-0 pc-w620-halign-center"
                                                                  align="left"
                                                                  border="0"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  role="presentation">
                                                                  <tr class="pc-grid-tr-first pc-grid-tr-last">
                                                                    <td
                                                                      class="pc-grid-td-first pc-w620-padding-0-24"
                                                                      valign="top"
                                                                      style="
                                                                        padding-top: 0px;
                                                                        padding-right: 10px;
                                                                        padding-bottom: 0px;
                                                                        padding-left: 0px;
                                                                      ">
                                                                      <table
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        role="presentation">
                                                                        <tr>
                                                                          <td
                                                                            class="pc-w620-halign-center pc-w620-valign-top"
                                                                            align="left"
                                                                            valign="top">
                                                                            <table
                                                                              class="pc-w620-halign-center"
                                                                              align="left"
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              role="presentation">
                                                                              <tr>
                                                                                <td
                                                                                  class="pc-w620-halign-center"
                                                                                  align="left"
                                                                                  valign="top">
                                                                                  <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation"
                                                                                    class="pc-w620-halign-center"
                                                                                    align="left">
                                                                                    <tr>
                                                                                      <td valign="top" align="left">
                                                                                        <div
                                                                                          class="pc-font-alt pc-w620-align-center"
                                                                                          style="
                                                                                            line-height: 121%;
                                                                                            letter-spacing: -0px;
                                                                                            font-family: Urbanist, Arial,
                                                                                              Helvetica, sans-serif;
                                                                                            font-size: 14px;
                                                                                            font-weight: 600;
                                                                                            font-variant-ligatures: normal;
                                                                                            color: #121212;
                                                                                            text-align: left;
                                                                                            text-align-last: left;
                                                                                          ">
                                                                                        </div>
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </table>
                                                                    </td>
                                                                    <td
                                                                      class="pc-w620-padding-0-24"
                                                                      valign="top"
                                                                      style="
                                                                        padding-top: 0px;
                                                                        padding-right: 10px;
                                                                        padding-bottom: 0px;
                                                                        padding-left: 10px;
                                                                      ">
                                                                      <table
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        role="presentation">
                                                                        <tr>
                                                                          <td
                                                                            class="pc-w620-halign-center pc-w620-valign-top"
                                                                            align="left"
                                                                            valign="top">
                                                                            <table
                                                                              class="pc-w620-halign-center"
                                                                              align="left"
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              role="presentation">
                                                                              <tr>
                                                                                <td
                                                                                  class="pc-w620-halign-center"
                                                                                  align="left"
                                                                                  valign="top">
                                                                                  <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation"
                                                                                    class="pc-w620-halign-center"
                                                                                    align="left">
                                                                                    <tr>
                                                                                      <td valign="top" align="left">
                                                                                        <div
                                                                                          class="pc-font-alt pc-w620-align-center"
                                                                                          style="
                                                                                            line-height: 121%;
                                                                                            letter-spacing: -0px;
                                                                                            font-family: Urbanist, Arial,
                                                                                              Helvetica, sans-serif;
                                                                                            font-size: 14px;
                                                                                            font-weight: 600;
                                                                                            font-variant-ligatures: normal;
                                                                                            color: #121212;
                                                                                            text-align: left;
                                                                                            text-align-last: left;
                                                                                          ">
                                                                                        </div>
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </table>
                                                                    </td>
                                                                    <td
                                                                      class="pc-grid-td-last pc-w620-padding-0-24"
                                                                      valign="top"
                                                                      style="
                                                                        padding-top: 0px;
                                                                        padding-right: 0px;
                                                                        padding-bottom: 0px;
                                                                        padding-left: 10px;
                                                                      ">
                                                                      <table
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        role="presentation">
                                                                        <tr>
                                                                          <td
                                                                            class="pc-w620-halign-center pc-w620-valign-top"
                                                                            align="left"
                                                                            valign="top">
                                                                            <table
                                                                              class="pc-w620-halign-center"
                                                                              align="left"
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              role="presentation">
                                                                              <tr>
                                                                                <td
                                                                                  class="pc-w620-halign-center"
                                                                                  align="left"
                                                                                  valign="top">
                                                                                  <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation"
                                                                                    class="pc-w620-halign-center"
                                                                                    align="left">
                                                                                    <tr>
                                                                                      <td valign="top" align="left">
                                                                                        <div
                                                                                          class="pc-font-alt pc-w620-align-center"
                                                                                          style="
                                                                                            line-height: 120%;
                                                                                            letter-spacing: -0px;
                                                                                            font-family: Urbanist, Arial,
                                                                                              Helvetica, sans-serif;
                                                                                            font-size: 14px;
                                                                                            font-weight: 600;
                                                                                            font-variant-ligatures: normal;
                                                                                            color: #121212;
                                                                                            text-align: left;
                                                                                            text-align-last: left;
                                                                                          ">
                                                                                        </div>
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!-- END MODULE: Menu -->
                    </td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <!-- BEGIN MODULE: Confirmation -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                        <tr>
                          <td class="pc-w620-spacing-0-0-10-0" style="padding: 0px 0px 10px 0px">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                              <tr>
                                <td
                                  valign="top"
                                  class="pc-w620-padding-20-0-0-0"
                                  style="padding: 0px 0px 0px 0px; border-radius: 0px; background-color: transparent"
                                  bgcolor="transparent">
                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px">
                                        <table
                                          class="pc-width-fill pc-w620-gridCollapsed-1"
                                          width="100%"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation">
                                          <tr class="pc-grid-tr-first pc-grid-tr-last">
                                            <td
                                              class="pc-grid-td-first pc-grid-td-last pc-w620-padding-30-0"
                                              align="left"
                                              valign="top"
                                              style="
                                                width: 50%;
                                                padding-top: 0px;
                                                padding-right: 0px;
                                                padding-bottom: 0px;
                                                padding-left: 0px;
                                              ">
                                              <table
                                                class="pc-w620-width-fill"
                                                width="100%"
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="width: 100%">
                                                <tr>
                                                  <td
                                                    class="pc-w620-padding-32-0-32-0"
                                                    align="center"
                                                    valign="middle"
                                                    style="
                                                      padding: 40px 40px 40px 40px;
                                                      background-color: #181818;
                                                      border-radius: 10px 10px 10px 10px;
                                                    ">
                                                    <table
                                                      class="pc-w620-width-fill"
                                                      align="center"
                                                      width="100%"
                                                      border="0"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      role="presentation"
                                                      style="width: 100%">
                                                      <tr>
                                                        <td align="center" valign="top">
                                                          <table
                                                            width="100%"
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            role="presentation">
                                                            <tr>
                                                              <td
                                                                class="pc-w620-spacing-0-0-16-0"
                                                                style="padding: 0px 0px 32px 0px">
                                                                <table
                                                                  class="pc-width-fill pc-w620-gridCollapsed-1"
                                                                  width="100%"
                                                                  border="0"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  role="presentation">
                                                                  <tr class="pc-grid-tr-first pc-grid-tr-last">
                                                                    <td
                                                                      class="pc-grid-td-first pc-grid-td-last pc-w620-padding-30-0"
                                                                      align="center"
                                                                      valign="top"
                                                                      style="
                                                                        padding-top: 0px;
                                                                        padding-right: 0px;
                                                                        padding-bottom: 0px;
                                                                        padding-left: 0px;
                                                                      ">
                                                                      <table
                                                                        width="100%"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        role="presentation"
                                                                        style="width: 100%">
                                                                        <tr>
                                                                          <td align="center" valign="top">
                                                                            <table
                                                                              align="center"
                                                                              width="100%"
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              role="presentation"
                                                                              style="width: 100%">
                                                                              <tr>
                                                                                <td align="center" valign="top">
                                                                                  <table
                                                                                    width="100%"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation">
                                                                                    <tr>
                                                                                      <td align="center" valign="top">
                                                                                        <img
                                                                                          src="https://res.cloudinary.com/dmtiq7l2k/image/upload/v1712241230/image-1711725679315_xhjbt3.png"
                                                                                          class="pc-w620-width-226 pc-w620-height-auto"
                                                                                          width="243"
                                                                                          height="70"
                                                                                          alt=""
                                                                                          style="
                                                                                            display: block;
                                                                                            border: 0;
                                                                                            outline: 0;
                                                                                            line-height: 100%;
                                                                                            -ms-interpolation-mode: bicubic;
                                                                                            width: 243px;
                                                                                            height: auto;
                                                                                            max-width: 100%;
                                                                                          " />
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td align="center" valign="top">
                                                          <table
                                                            align="center"
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            role="presentation">
                                                            <tr>
                                                              <td
                                                                class="pc-w620-spacing-0-24-12-24"
                                                                valign="top"
                                                                style="padding: 0px 0px 12px 0px">
                                                                <table
                                                                  border="0"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  role="presentation">
                                                                  <tr>
                                                                    <td
                                                                      valign="top"
                                                                      class="pc-w620-padding-0-0-0-0"
                                                                      align="center"
                                                                      style="padding: 0px 0px 0px 0px">
                                                                      <div
                                                                        class="pc-font-alt pc-w620-fontSize-34px pc-w620-lineHeight-100pc"
                                                                        style="
                                                                          line-height: 108%;
                                                                          letter-spacing: -1px;
                                                                          font-family: Poppins, Arial, Helvetica,
                                                                            sans-serif;
                                                                          font-size: 50px;
                                                                          font-weight: 600;
                                                                          font-variant-ligatures: normal;
                                                                          color: #ffffff;
                                                                          text-align: center;
                                                                          text-align-last: center;
                                                                        ">
                                                                        <div>
                                                                          <span>Appointment </span
                                                                          ><span style="color: #7CB9E8">For Release</span>
                                                                        </div>
                                                                        <div><span>#{{nanoid}}</span></div>
                                                                      </div>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td align="center" valign="top">
                                                          <table
                                                            align="center"
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            role="presentation">
                                                            <tr>
                                                              <td
                                                                class="pc-w620-spacing-0-24-24-24"
                                                                valign="top"
                                                                style="padding: 0px 0px 40px 0px">
                                                                <table
                                                                  border="0"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  role="presentation"
                                                                  align="center">
                                                                  <tr>
                                                                    <td
                                                                      valign="top"
                                                                      class="pc-font-alt pc-w620-padding-0-0-0-0 pc-w620-fontSize-14px"
                                                                      align="center"
                                                                      style="
                                                                        padding: 0px 40px 0px 40px;
                                                                        mso-line-height: exactly;
                                                                        line-height: 150%;
                                                                        letter-spacing: -0px;
                                                                        font-family: Urbanist, Arial, Helvetica,
                                                                          sans-serif;
                                                                        font-size: 16px;
                                                                        font-weight: 500;
                                                                        color: #ffffff;
                                                                        text-align: center;
                                                                        text-align-last: center;
                                                                        font-variant-ligatures: normal;
                                                                      ">
                                                                      <div><span>﻿</span></div>
                                                                      <div>
                                                                        <span
                                                                          style="font-weight: 700; font-style: normal"
                                                                          >Your appointment is now ready for release! Please pick up your vehicle as soon as possible.</span
                                                                        >
                                                                      </div>
                                                                      <div><span>﻿</span></div>
                                                                      <div>
                                                                        <span
                                                                          style="font-weight: 400; font-style: normal"
                                                                          >Thank you for waiting and patronizing with Agapaint!</span
                                                                        >
                                                                      </div>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td align="center" valign="top">
                                                          <table
                                                            width="100%"
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            role="presentation">
                                                            <tr>
                                                              <td
                                                                class="pc-w620-spacing-0-16-40-16"
                                                                style="padding: 0px 0px 40px 0px">
                                                                <table
                                                                  class="pc-width-fill pc-w620-gridCollapsed-1 pc-w620-dir-ltr"
                                                                  width="100%"
                                                                  border="0"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  role="presentation">
                                                                  <tr class="pc-grid-tr-first pc-grid-tr-last">
                                                                    <td
                                                                      class="pc-grid-td-first pc-w620-padding-10-0 pc-w620-padding-0-4"
                                                                      align="left"
                                                                      valign="top"
                                                                      style="
                                                                        width: 33.333333333333%;
                                                                        padding-top: 0px;
                                                                        padding-right: 4px;
                                                                        padding-bottom: 0px;
                                                                        padding-left: 0px;
                                                                      ">
                                                                      <table
                                                                        width="100%"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        role="presentation"
                                                                        style="width: 100%">
                                                                        <tr>
                                                                          <td
                                                                            class="pc-w620-padding-20-0-20-0"
                                                                            align="center"
                                                                            valign="top"
                                                                            style="
                                                                              padding: 40px 20px 40px 20px;
                                                                              background-color: #fff3cd;
                                                                              border-radius: 12px 12px 12px 12px;
                                                                            ">
                                                                            <table
                                                                              align="center"
                                                                              width="100%"
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              role="presentation"
                                                                              style="width: 100%">
                                                                              <tr>
                                                                                <td align="center" valign="top">
                                                                                  <table
                                                                                    width="100%"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation">
                                                                                    <tr>
                                                                                      <td
                                                                                        align="center"
                                                                                        valign="top"
                                                                                        style="
                                                                                          padding: 0px 0px 15px 0px;
                                                                                        ">
                                                                                        <img
                                                                                          src="https://res.cloudinary.com/dmtiq7l2k/image/upload/v1712241231/image-1711726156298_msykiq.png"
                                                                                          class=""
                                                                                          width="40"
                                                                                          height="40"
                                                                                          alt=""
                                                                                          style="
                                                                                            display: block;
                                                                                            border: 0;
                                                                                            outline: 0;
                                                                                            line-height: 100%;
                                                                                            -ms-interpolation-mode: bicubic;
                                                                                            width: 40px;
                                                                                            height: auto;
                                                                                            max-width: 100%;
                                                                                          " />
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                              <tr>
                                                                                <td align="center" valign="top">
                                                                                  <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation"
                                                                                    align="center"
                                                                                    style="
                                                                                      margin-right: auto;
                                                                                      margin-left: auto;
                                                                                    ">
                                                                                    <tr>
                                                                                      <td
                                                                                        valign="top"
                                                                                        class="pc-font-alt pc-w620-fontSize-16px"
                                                                                        align="center"
                                                                                        style="
                                                                                          mso-line-height: exactly;
                                                                                          line-height: 110%;
                                                                                          letter-spacing: -0px;
                                                                                          font-family: Urbanist, Arial,
                                                                                            Helvetica, sans-serif;
                                                                                          font-size: 18px;
                                                                                          font-weight: 600;
                                                                                          color: #0d231c;
                                                                                          text-align: center;
                                                                                          text-align-last: center;
                                                                                          font-variant-ligatures: normal;
                                                                                        ">
                                                                                        <div>
                                                                                          <span>{{date}}</span>
                                                                                        </div>
                                                                          
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </table>
                                                                    </td>
                                                                    <td
                                                                      class="pc-w620-padding-10-0 pc-w620-padding-0-4"
                                                                      align="left"
                                                                      valign="top"
                                                                      style="
                                                                        width: 33.333333333333%;
                                                                        padding-top: 0px;
                                                                        padding-right: 4px;
                                                                        padding-bottom: 0px;
                                                                        padding-left: 4px;
                                                                      ">
                                                                      <table
                                                                        width="100%"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        role="presentation"
                                                                        style="width: 100%">
                                                                        <tr>
                                                                          <td
                                                                            class="pc-w620-padding-20-0-20-0"
                                                                            align="center"
                                                                            valign="top"
                                                                            style="
                                                                              padding: 40px 16px 40px 10px;
                                                                              background-color: #fff3cd;
                                                                              border-radius: 12px 12px 12px 12px;
                                                                            ">
                                                                            <table
                                                                              align="center"
                                                                              width="100%"
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              role="presentation"
                                                                              style="width: 100%">
                                                                              <tr>
                                                                                <td align="center" valign="top">
                                                                                  <table
                                                                                    width="100%"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation">
                                                                                    <tr>
                                                                                      <td
                                                                                        align="center"
                                                                                        valign="top"
                                                                                        style="
                                                                                          padding: 0px 0px 15px 0px;
                                                                                        ">
                                                                                        <img
                                                                                          src="https://res.cloudinary.com/dmtiq7l2k/image/upload/v1712241233/image-1711726200663_eepez2.png"
                                                                                          class=""
                                                                                          width="40"
                                                                                          height="40"
                                                                                          alt=""
                                                                                          style="
                                                                                            display: block;
                                                                                            border: 0;
                                                                                            outline: 0;
                                                                                            line-height: 100%;
                                                                                            -ms-interpolation-mode: bicubic;
                                                                                            width: 40px;
                                                                                            height: auto;
                                                                                            max-width: 100%;
                                                                                          " />
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                              <tr>
                                                                                <td align="center" valign="top">
                                                                                  <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation"
                                                                                    align="center"
                                                                                    style="
                                                                                      margin-right: auto;
                                                                                      margin-left: auto;
                                                                                    ">
                                                                                    <tr>
                                                                                      <td
                                                                                        valign="top"
                                                                                        class="pc-font-alt pc-w620-fontSize-16px"
                                                                                        align="center"
                                                                                        style="
                                                                                          mso-line-height: exactly;
                                                                                          line-height: 110%;
                                                                                          letter-spacing: -0px;
                                                                                          font-family: Urbanist, Arial,
                                                                                            Helvetica, sans-serif;
                                                                                          font-size: 18px;
                                                                                          font-weight: 600;
                                                                                          color: #1c3425;
                                                                                          text-align: center;
                                                                                          text-align-last: center;
                                                                                          font-variant-ligatures: normal;
                                                                                        ">
                                                                                        <div><span>{{time}}</span></div>
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </table>
                                                                    </td>
                                                                    <td
                                                                      class="pc-grid-td-last pc-w620-padding-10-0 pc-w620-padding-0-4"
                                                                      align="left"
                                                                      valign="top"
                                                                      style="
                                                                        width: 33.333333333333%;
                                                                        padding-top: 0px;
                                                                        padding-right: 0px;
                                                                        padding-bottom: 0px;
                                                                        padding-left: 4px;
                                                                      ">
                                                                      <table
                                                                        width="100%"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        role="presentation"
                                                                        style="width: 100%">
                                                                        <tr>
                                                                          <td
                                                                            class="pc-w620-padding-20-0-20-0"
                                                                            align="center"
                                                                            valign="top"
                                                                            style="
                                                                              padding: 40px 20px 40px 20px;
                                                                              background-color: #fff3cd;
                                                                              border-radius: 12px 12px 12px 12px;
                                                                            ">
                                                                            <table
                                                                              align="center"
                                                                              width="100%"
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              role="presentation"
                                                                              style="width: 100%">
                                                                              <tr>
                                                                                <td align="center" valign="top">
                                                                                  <table
                                                                                    width="100%"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation">
                                                                                    <tr>
                                                                                      <td
                                                                                        align="center"
                                                                                        valign="top"
                                                                                        style="
                                                                                          padding: 0px 0px 15px 0px;
                                                                                        ">
                                                                                        <img
                                                                                          src="https://res.cloudinary.com/dmtiq7l2k/image/upload/v1712241223/image-17117254801242_grxkzh.png"
                                                                                          class=""
                                                                                          width="40"
                                                                                          height="40"
                                                                                          alt=""
                                                                                          style="
                                                                                            display: block;
                                                                                            border: 0;
                                                                                            outline: 0;
                                                                                            line-height: 100%;
                                                                                            -ms-interpolation-mode: bicubic;
                                                                                            width: 40px;
                                                                                            height: auto;
                                                                                            max-width: 100%;
                                                                                          " />
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                              <tr>
                                                                                <td align="center" valign="top">
                                                                                  <table
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation"
                                                                                    align="center"
                                                                                    style="
                                                                                      margin-right: auto;
                                                                                      margin-left: auto;
                                                                                    ">
                                                                                    <tr>
                                                                                      <td
                                                                                        valign="top"
                                                                                        class="pc-font-alt pc-w620-fontSize-16px"
                                                                                        align="center"
                                                                                        style="
                                                                                          mso-line-height: exactly;
                                                                                          line-height: 110%;
                                                                                          letter-spacing: -0px;
                                                                                          font-family: Urbanist, Arial,
                                                                                            Helvetica, sans-serif;
                                                                                          font-size: 18px;
                                                                                          font-weight: 600;
                                                                                          color: #1c3425;
                                                                                          text-align: center;
                                                                                          text-align-last: center;
                                                                                          font-variant-ligatures: normal;
                                                                                        ">
                                                                                        <div>
                                                                                          <span
                                                                                            >{{carManufacturer}} {{carModel}}</span
                                                                                          >
                                                                                        </div>
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td align="center" valign="top">
                                                          <table
                                                            align="center"
                                                            border="0"
                                                            cellpadding="0"
                                                            cellspacing="0"
                                                            role="presentation">
                                                            <tr>
                                                              <td align="center">
                                                                <table
                                                                  class="pc-width-hug pc-w620-gridCollapsed-1"
                                                                  align="center"
                                                                  border="0"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  role="presentation">
                                                                  <tr class="pc-grid-tr-first pc-grid-tr-last">
                                                                    <td
                                                                      class="pc-grid-td-first pc-grid-td-last pc-w620-padding-30-0"
                                                                      valign="middle"
                                                                      style="
                                                                        padding-top: 0px;
                                                                        padding-right: 0px;
                                                                        padding-bottom: 0px;
                                                                        padding-left: 0px;
                                                                      ">
                                                                      <table
                                                                        width="100%"
                                                                        border="0"
                                                                        cellpadding="0"
                                                                        cellspacing="0"
                                                                        role="presentation"
                                                                        style="width: 100%">
                                                                        <tr>
                                                                          <td align="center" valign="top">
                                                                            <table
                                                                              align="center"
                                                                              width="100%"
                                                                              border="0"
                                                                              cellpadding="0"
                                                                              cellspacing="0"
                                                                              role="presentation"
                                                                              style="width: 100%">
                                                                              <tr>
                                                                                <td align="center" valign="top">
                                                                                  <table
                                                                                    align="center"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation">
                                                                                    <tr>
                                                                                      <th
                                                                                        valign="top"
                                                                                        class="pc-w620-spacing-0-0-16-0"
                                                                                        style="
                                                                                          padding: 0px 0px 24px 0px;
                                                                                          text-align: left;
                                                                                          font-weight: normal;
                                                                                          line-height: 1;
                                                                                        ">
                                                                                        <!--[if mso]>
                                                                                          <table
                                                                                            class="pc-w620-width-300"
                                                                                            border="0"
                                                                                            cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            role="presentation"
                                                                                            align="center"
                                                                                            width="300"
                                                                                            style="
                                                                                              border-collapse: separate;
                                                                                            ">
                                                                                            <tr>
                                                                                              <td
                                                                                                valign="middle"
                                                                                                align="center"
                                                                                                style="
                                                                                                  width: 300px;
                                                                                                  border-radius: 500px
                                                                                                    500px 500px 500px;
                                                                                                  background-color: #f1b038;
                                                                                                  text-align: center;
                                                                                                  color: #ffffff;
                                                                                                  padding: 12px 24px
                                                                                                    12px 24px;
                                                                                                  mso-padding-left-alt: 0;
                                                                                                  margin-left: 24px;
                                                                                                "
                                                                                                bgcolor="#f1b038">
                                                                                                <a
                                                                                                  class="pc-font-alt"
                                                                                                  style="
                                                                                                    display: inline-block;
                                                                                                    text-decoration: none;
                                                                                                    font-variant-ligatures: normal;
                                                                                                    font-family: Urbanist,
                                                                                                      Arial, Helvetica,
                                                                                                      sans-serif;
                                                                                                    font-weight: bold;
                                                                                                    font-size: 16px;
                                                                                                    line-height: 24px;
                                                                                                    letter-spacing: -0px;
                                                                                                    color: #ffffff;
                                                                                                  "
                                                                                                  href="{{url}}"
                                                                                                  target="_blank"
                                                                                                  >View Your
                                                                                                  Appointment</a
                                                                                                >
                                                                                              </td>
                                                                                            </tr>
                                                                                          </table>
                                                                                        <![endif]-->
                                                                                        <!--[if !mso]><! --><a
                                                                                          class="pc-w620-width-300"
                                                                                          style="
                                                                                            display: inline-block;
                                                                                            border-radius: 500px 500px
                                                                                              500px 500px;
                                                                                            background-color: #f1b038;
                                                                                            padding: 12px 24px 12px 24px;
                                                                                            width: 300px;
                                                                                            font-family: Urbanist, Arial,
                                                                                              Helvetica, sans-serif;
                                                                                            font-weight: bold;
                                                                                            font-size: 16px;
                                                                                            line-height: 24px;
                                                                                            letter-spacing: -0px;
                                                                                            color: #ffffff;
                                                                                            vertical-align: top;
                                                                                            text-align: center;
                                                                                            text-align-last: center;
                                                                                            text-decoration: none;
                                                                                            -webkit-text-size-adjust: none;
                                                                                          "
                                                                                          href="{{url}}"
                                                                                          target="_blank"
                                                                                          >View Your Appointment</a
                                                                                        >
                                                                                        <!--<![endif]-->
                                                                                      </th>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                              <tr>
                                                                                <td align="center" valign="top">
                                                                                  <table
                                                                                    width="100%"
                                                                                    align="center"
                                                                                    border="0"
                                                                                    cellpadding="0"
                                                                                    cellspacing="0"
                                                                                    role="presentation">
                                                                                    <tr>
                                                                                      <td
                                                                                        class="pc-w620-spacing-0-0-0-0"
                                                                                        valign="top"
                                                                                        style="
                                                                                          padding: 0px 0px 0px 0px;
                                                                                        ">
                                                                                        <table
                                                                                          border="0"
                                                                                          cellpadding="0"
                                                                                          cellspacing="0"
                                                                                          role="presentation"
                                                                                          class="pc-w620-width-100pc"
                                                                                          width="100%"
                                                                                          align="center">
                                                                                          <tr>
                                                                                            <td
                                                                                              valign="top"
                                                                                              class="pc-font-alt pc-w620-align-center pc-w620-padding-0-30-0-30 pc-w620-fontSize-12px"
                                                                                              align="center"
                                                                                              style="
                                                                                                padding: 0px 50px 0px
                                                                                                  50px;
                                                                                                mso-line-height: exactly;
                                                                                                line-height: 150%;
                                                                                                letter-spacing: -0px;
                                                                                                font-family: Urbanist,
                                                                                                  Arial, Helvetica,
                                                                                                  sans-serif;
                                                                                                font-size: 12px;
                                                                                                font-weight: 500;
                                                                                                color: #ffffffcc;
                                                                                                text-align: center;
                                                                                                text-align-last: center;
                                                                                                font-variant-ligatures: normal;
                                                                                              ">
                                                                                              <div>
                                                                                                <span
                                                                                                  >Please wait for the
                                                                                                  payment confirmation
                                                                                                  email to fully verify
                                                                                                  your appointment with
                                                                                                  us. Reach out to the
                                                                                                  Agapaint&#39;s
                                                                                                  Official Facebook Page
                                                                                                  for
                                                                                                </span>
                                                                                              </div>
                                                                                              <div>
                                                                                                <span
                                                                                                  >any appointment
                                                                                                  concerns.</span
                                                                                                >
                                                                                              </div>
                                                                                            </td>
                                                                                          </tr>
                                                                                        </table>
                                                                                      </td>
                                                                                    </tr>
                                                                                  </table>
                                                                                </td>
                                                                              </tr>
                                                                            </table>
                                                                          </td>
                                                                        </tr>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!-- END MODULE: Confirmation -->
                    </td>
                  </tr>
                  <tr>
                    <td valign="top">
                      <!-- BEGIN MODULE: Order Details -->
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                        <tr>
                          <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                              <tr>
                                <td
                                  valign="top"
                                  class="pc-w620-padding-32-24-0-24"
                                  style="
                                    padding: 48px 32px 32px 32px;
                                    border-radius: 10px 10px 0px 0px;
                                    background-color: #ffffff;
                                  "
                                  bgcolor="#ffffff">
                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td
                                        class="pc-w620-spacing-0-0-4-0 pc-w620-align-left"
                                        align="center"
                                        valign="top"
                                        style="padding: 0px 0px 8px 0px">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          align="center">
                                          <tr>
                                            <td
                                              valign="top"
                                              class="pc-font-alt pc-w620-align-left pc-w620-padding-0-0-0-0 pc-w620-fontSize-32px pc-w620-lineHeight-40"
                                              align="center"
                                              style="
                                                padding: 0px 0px 0px 0px;
                                                mso-line-height: exactly;
                                                line-height: 120%;
                                                letter-spacing: -0px;
                                                font-family: Urbanist, Arial, Helvetica, sans-serif;
                                                font-size: 32px;
                                                font-weight: bold;
                                                color: #0d231c;
                                                text-align: center;
                                                text-align-last: center;
                                                font-variant-ligatures: normal;
                                              ">
                                              <div><span>Appointment details</span></div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td
                                        class="pc-w620-align-left"
                                        align="center"
                                        valign="top"
                                        style="padding: 0px 0px 24px 0px">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          align="center">
                                          <tr>
                                            <td
                                              valign="top"
                                              class="pc-font-alt pc-w620-align-left pc-w620-fontSize-16px pc-w620-lineHeight-120pc"
                                              align="center"
                                              style="
                                                padding: 0px 0px 0px 0px;
                                                mso-line-height: exactly;
                                                line-height: 150%;
                                                letter-spacing: -0px;
                                                font-family: Urbanist, Arial, Helvetica, sans-serif;
                                                font-size: 16px;
                                                font-weight: 600;
                                                color: #000000;
                                                text-align: center;
                                                text-align-last: center;
                                                font-variant-ligatures: normal;
                                              ">
                                              <div>
                                                <span style="color: rgb(13, 35, 28)">Appointment Id:</span
                                                ><span style="color: rgb(29, 52, 37)"> </span
                                                ><span style="color: #f1b038">#{{nanoid}}</span>
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td style="padding: 0px 0px 0px 0px">
                                        <table
                                          class="pc-w620-tableCollapsed-0"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          width="100%"
                                          style="
                                            border-collapse: separate;
                                            border-spacing: 0;
                                            width: 100%;
                                            border-radius: 12px 12px 12px 12px;
                                          ">
                                          <tbody>
                                            <tr>
                                              <td
                                                class="pc-w620-halign-left pc-w620-valign-middle pc-w620-width-100pc"
                                                align="left"
                                                valign="top"
                                                style="padding: 10px 10px 10px 0px; border-bottom: 1px solid #e7e7d2">
                                                <table
                                                  width="100%"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation">
                                                  <tr>
                                                    <td class="pc-w620-align-left" valign="top">
                                                      <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        role="presentation"
                                                        width="100%">
                                                        <tr>
                                                          <td
                                                            valign="top"
                                                            class="pc-font-alt pc-w620-align-left"
                                                            style="
                                                              mso-line-height: exactly;
                                                              line-height: 20px;
                                                              letter-spacing: 0px;
                                                              font-family: Urbanist, Arial, Helvetica, sans-serif;
                                                              font-size: 20px;
                                                              font-weight: 600;
                                                              color: #0d231c;
                                                              font-variant-ligatures: normal;
                                                            ">
                                                            <div>
                                                              <span style="color: rgb(13, 35, 28)"
                                                                >Services Availed:</span
                                                              >
                                                              <span style="color: #f1b038">{{services}}</span>
                                                            </div>
                                                            <div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                class="pc-w620-halign-left pc-w620-valign-middle pc-w620-width-100pc"
                                                align="left"
                                                valign="middle"
                                                style="padding: 20px 0px 20px 0px; border-bottom: 1px solid #e7e7d2cc">
                                                <table
                                                  width="100%"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation">
                                                  <tr>
                                                    <td
                                                      class="pc-w620-align-left"
                                                      align="left"
                                                      valign="top"
                                                      style="padding: 0px 0px 2px 0px">
                                                      <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        role="presentation"
                                                        align="left">
                                                        <tr>
                                                          <td
                                                            valign="top"
                                                            class="pc-font-alt pc-w620-align-left"
                                                            align="left"
                                                            style="
                                                              mso-line-height: exactly;
                                                              line-height: 24px;
                                                              letter-spacing: -0px;
                                                              font-family: Urbanist, Arial, Helvetica, sans-serif;
                                                              font-size: 14px;
                                                              font-weight: 600;
                                                              color: #121212cc;
                                                              text-align: left;
                                                              text-align-last: left;
                                                              font-variant-ligatures: normal;
                                                            ">
                                                            <div><span>Down payment (50%)</span></div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                                <table
                                                  width="100%"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation">
                                                  <tr>
                                                    <td
                                                      class="pc-w620-align-left"
                                                      align="left"
                                                      valign="top"
                                                      style="padding: 0px 0px 2px 0px">
                                                      <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        role="presentation"
                                                        align="left">
                                                        <tr>
                                                          <td
                                                            valign="top"
                                                            class="pc-font-alt pc-w620-align-left"
                                                            align="left"
                                                            style="
                                                              mso-line-height: exactly;
                                                              line-height: 24px;
                                                              letter-spacing: -0px;
                                                              font-family: Urbanist, Arial, Helvetica, sans-serif;
                                                              font-size: 14px;
                                                              font-weight: 600;
                                                              color: #121212cc;
                                                              text-align: left;
                                                              text-align-last: left;
                                                              font-variant-ligatures: normal;
                                                            ">
                                                            <div><span>Partial 2 (25%)</span></div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                                <table
                                                  width="100%"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation">
                                                  <tr>
                                                    <td
                                                      class="pc-w620-align-left"
                                                      align="left"
                                                      valign="top"
                                                      style="padding: 0px 0px 2px 0px">
                                                      <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        role="presentation"
                                                        align="left">
                                                        <tr>
                                                          <td
                                                            valign="top"
                                                            class="pc-font-alt pc-w620-align-left pc-w620-lineHeight-24"
                                                            align="left"
                                                            style="
                                                              padding: 0px 0px 0px 0px;
                                                              mso-line-height: exactly;
                                                              line-height: 24px;
                                                              letter-spacing: -0px;
                                                              font-family: Urbanist, Arial, Helvetica, sans-serif;
                                                              font-size: 14px;
                                                              font-weight: 600;
                                                              color: #1d3425;
                                                              text-align: left;
                                                              text-align-last: left;
                                                              font-variant-ligatures: normal;
                                                            ">
                                                            <div><span>Partial 3 (25%)</span></div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                              <td
                                                class="pc-w620-halign-right pc-w620-valign-middle"
                                                align="right"
                                                valign="bottom"
                                                style="padding: 0px 0px 20px 0px; border-bottom: 1px solid #e7e7d2cc">
                                                <table
                                                  width="100%"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation">
                                                  <tr>
                                                    <td
                                                      class="pc-w620-spacing-0-0-0-40"
                                                      valign="top"
                                                      style="padding: 0px 0px 0px 0px">
                                                      <table
                                                        width="100%"
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        role="presentation">
                                                        <tr>
                                                          <td
                                                            class="pc-w620-padding-0-0-0-0"
                                                            valign="top"
                                                            align="right"
                                                            style="padding: 0px 0px 0px 0px">
                                                            <table
                                                              width="100%"
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                              role="presentation">
                                                              <tr>
                                                                <th
                                                                  valign="top"
                                                                  align="right"
                                                                  style="
                                                                    font-weight: normal;
                                                                    text-align: left;
                                                                    padding: 0px 0px 2px 0px;
                                                                  ">
                                                                  <table
                                                                    border="0"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                    role="presentation"
                                                                    width="100%">
                                                                    <tr>
                                                                      <td
                                                                        valign="top"
                                                                        class="pc-font-alt"
                                                                        align="right"
                                                                        style="
                                                                          padding: 0px 0px 0px 0px;
                                                                          mso-line-height: exactly;
                                                                          line-height: 140%;
                                                                          letter-spacing: -0px;
                                                                          font-family: Urbanist, Arial, Helvetica,
                                                                            sans-serif;
                                                                          font-size: 16px;
                                                                          font-weight: 600;
                                                                          color: #1c3425;
                                                                          text-align: right;
                                                                          text-align-last: right;
                                                                          font-variant-ligatures: normal;
                                                                        ">
                                                                        <div><span>{{payment1}}</span></div>
                                                                      </td>
                                                                    </tr>
                                                                  </table>
                                                                </th>
                                                              </tr>
                                                              <tr>
                                                                <th
                                                                  valign="top"
                                                                  align="right"
                                                                  style="
                                                                    font-weight: normal;
                                                                    text-align: left;
                                                                    padding: 0px 0px 2px 0px;
                                                                  ">
                                                                  <table
                                                                    border="0"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                    role="presentation"
                                                                    width="100%">
                                                                    <tr>
                                                                      <td
                                                                        valign="top"
                                                                        class="pc-font-alt"
                                                                        align="right"
                                                                        style="
                                                                          padding: 0px 0px 0px 0px;
                                                                          mso-line-height: exactly;
                                                                          line-height: 140%;
                                                                          letter-spacing: -0px;
                                                                          font-family: Urbanist, Arial, Helvetica,
                                                                            sans-serif;
                                                                          font-size: 16px;
                                                                          font-weight: 600;
                                                                          color: #1d3425;
                                                                          text-align: right;
                                                                          text-align-last: right;
                                                                          font-variant-ligatures: normal;
                                                                        ">
                                                                        <div><span>{{payment2}}</span></div>
                                                                      </td>
                                                                    </tr>
                                                                  </table>
                                                                </th>
                                                              </tr>
                                                              <tr>
                                                                <th
                                                                  class="pc-w620-spacing-0-0-2-0"
                                                                  valign="top"
                                                                  align="right"
                                                                  style="
                                                                    font-weight: normal;
                                                                    text-align: left;
                                                                    padding: 0px 0px 2px 0px;
                                                                  ">
                                                                  <table
                                                                    border="0"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                    role="presentation"
                                                                    width="100%">
                                                                    <tr>
                                                                      <td
                                                                        valign="top"
                                                                        class="pc-font-alt pc-w620-padding-0-0-0-0"
                                                                        align="right"
                                                                        style="
                                                                          padding: 0px 0px 0px 0px;
                                                                          mso-line-height: exactly;
                                                                          line-height: 140%;
                                                                          letter-spacing: 0px;
                                                                          font-family: Urbanist, Arial, Helvetica,
                                                                            sans-serif;
                                                                          font-size: 16px;
                                                                          font-weight: 600;
                                                                          color: #1d3425;
                                                                          text-align: right;
                                                                          text-align-last: right;
                                                                          font-variant-ligatures: normal;
                                                                        ">
                                                                        <div><span>{{payment3}}</span></div>
                                                                      </td>
                                                                    </tr>
                                                                  </table>
                                                                </th>
                                                              </tr>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr align="left" valign="middle">
                                              <td
                                                class="pc-w620-halign-left pc-w620-valign-middle pc-w620-width-100pc"
                                                align="left"
                                                valign="middle"
                                                style="padding: 20px 0px 20px 0px">
                                                <table
                                                  width="100%"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation">
                                                  <tr>
                                                    <td
                                                      class="pc-w620-spacing-20-0-0-0 pc-w620-align-left"
                                                      valign="top">
                                                      <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        role="presentation">
                                                        <tr>
                                                          <td
                                                            valign="top"
                                                            class="pc-font-alt pc-w620-align-left pc-w620-padding-0-0-0-0 pc-w620-fontSize-16 pc-w620-lineHeight-20"
                                                            style="
                                                              mso-line-height: exactly;
                                                              line-height: 22px;
                                                              letter-spacing: -0px;
                                                              font-family: Urbanist, Arial, Helvetica, sans-serif;
                                                              font-size: 16px;
                                                              font-weight: bold;
                                                              color: #1d3425;
                                                              font-variant-ligatures: normal;
                                                            ">
                                                            <div><span>Total </span></div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                              <td
                                                class="pc-w620-halign-right pc-w620-valign-middle pc-w620-width-100pc"
                                                align="right"
                                                valign="middle"
                                                style="padding: 20px 0px 20px 0px">
                                                <table
                                                  width="100%"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  role="presentation">
                                                  <tr>
                                                    <td
                                                      class="pc-w620-spacing-0-0-0-0 pc-w620-align-right"
                                                      align="right"
                                                      valign="top">
                                                      <table
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                        role="presentation"
                                                        align="right">
                                                        <tr>
                                                          <td
                                                            valign="top"
                                                            class="pc-font-alt pc-w620-align-right pc-w620-padding-0-0-0-0 pc-w620-fontSize-20px pc-w620-lineHeight-20"
                                                            align="right"
                                                            style="
                                                              mso-line-height: exactly;
                                                              line-height: 22px;
                                                              letter-spacing: -0px;
                                                              font-family: Urbanist, Arial, Helvetica, sans-serif;
                                                              font-size: 20px;
                                                              font-weight: 800;
                                                              color: #1d3425;
                                                              text-align: right;
                                                              text-align-last: right;
                                                              font-variant-ligatures: normal;
                                                            ">
                                                            <div>
                                                              <span style="color: rgb(29, 52, 37)">{{startingBalance}}</span>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!-- END MODULE: Order Details -->
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- Fix for Gmail on iOS -->
    <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0">
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    </div>
  </body>
</html>

`;
