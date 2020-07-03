$(function(){
  function buildHTML(message){
    if (message.image){
      let html = `<div class="chat__main__list" data-message-id=${message.id}>
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
      let html = `<div class="chat__main__list" data-message-id=${message.id}>
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


  let reloadMessages = function(){
    let last_message_id = $('.chat__main__list:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'get',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){
      if (messages.length !== 0){
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.chat__main').append(insertHTML);
        $('.chat__main').animate({scrollTop: $('.chat__main')[0].scrollHeight });
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  setInterval(reloadMessages, 7000);
});