$(function(){
  function buildHTML(message){
    if (message.image){
      let html = `<div class="chat__main__list">
                    <div class="chat__main__list__head">
                      <div class="chat__main__list__head__name">
                        ${message.user_name}
                      </div>
                      <div class="chat__main__list__head__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat__main__list__message">
                      ${message.content}
                    </div>
                    <img class="" src="${message.image}">
                  </div>`
      return html;
    } else{
      let html = `<div class="chat__main__list">
                    <div class="chat__main__list__head">
                      <div class="chat__main__list__head__name">
                        ${message.user_name}
                      </div>
                      <div class="chat__main__list__head__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat__main__list__message">
                      ${message.content}
                    </div>
                  </div>`
      return html;
    };
  }


  $(".form").on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this)
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message);
      console.log(html)
      $('.chat__main').append(html);
      $('.chat__main').animate({ scrollTop: $('.chat__main')[0].scrollHeight});
      $('form')[0].reset();
      $('.chat__footer__form__send').prop('disabled', false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});