$(function(){
  function addUser(user){
      let html =  `<div class="ChatMember clearfix">
                    <p class="ChatMember__name">${user.name}</p>
                    <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                   </div>`
      $("#UserSearchResult").append(html);
    }
    function addNoUser(){
      let html =  `<div class="ChatMember clearfix">
                    <p class="ChatMember__name">ユーザーが見つかりません</p>
                   </div>`
      $("#UserSearchResult").append(html);
    }
    function addMember(user_name, user_id){
      let html = `
                  <div class="ChatMember">
                    <p class="ChatMember__name">${user_name}</p>
                    <input name="group[user_ids][]" type="hidden" value="${user_id}" />
                    <div class="ChatMember__remove ChatMember__button">削除</div>
                  </div>
                  `;
    $(".ChatMembers").append(html)
    }

  $('#UserSearch__field').on('keyup', function(){
    let input = $('#UserSearch__field').val();
    $.ajax({
      url: '/users',
      type: 'get',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      console.log(users)
      $("#UserSearchResult").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          addUser(user);
        });
      }
      else if(input.length == 0){
        return false;
      }
      else{
        addNoUser();
      }
    })
    .fail(function(){
      console.log("通信エラーです。ユーザーが表示できません。");
    })
  })



  $("#UserSearchResult").on("click",".ChatMember__add", function(){
    let user_id = $(this).attr("data-user-id");
    let user_name = $(this).attr("data-user-name");
    $(this).parent().remove();
    addMember(user_name, user_id);
  });

  $(".ChatMembers").on("click", ".ChatMember__remove", function() {
    $(this).parent().remove();
  });






});