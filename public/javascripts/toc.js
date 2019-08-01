

  var ToC =
    "<nav role='navigation' class='table-of-contents'>" +
      "<h2 class='defra-toc'>Contents</h2>" +
      "<ol class='govuk-list defra-toc-ol'>";

  var newLine, el, title, link;

  $("h2").each(function() {

    el = $(this);
    title = el.text();
    link = "#" + el.attr("id");

    if ( link != "#undefined" ){

    newLine =
      "<li class='gem-c-contents-list__list-item gem-c-contents-list__list-item--dashed'>" +
        "<a href='" + link + "'>" +
          title +
        "</a>" +
      "</li>";

    ToC += newLine;
  }

  });

  ToC +=
     "</ul>" +
    "</nav>";


  $("#toc").html(ToC);
