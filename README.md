## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

  |Column|Type|Options|
  |------|----|-------|
  |meaasge_id|integer|null: false, foreign_key: true|
  |group_id|integer|foreign_key: true|
  |name|string|null: false, index: true|
  |mail|string|null: false|

### Association
- has_many :groups through:  :groups_users
- has_many :messages


## groupsテーブル

  |Column|Type|Options|
  |------|----|-------|
  |user_id|integer|foreign_key: true|
  |message_id|integer|foreign_key: true|
  
### Association
- has_many :users through:  :groups_users
- has_many :messages


## messagesテーブル

  |Column|Type|Options|
  |------|----|-------|
  |user_id|integer|null: false,foreign_key: true|
  |message_id|integer|null: false,foreign_key: true|
  |body|text|null: false,index: true|
  |image|text||
  
### Association
- belongs_to :group
- belongs_to :user