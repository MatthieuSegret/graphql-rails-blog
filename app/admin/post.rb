ActiveAdmin.register Post do

  permit_params :title, :content, :user_id

  index do
    id_column
    column :title
    column :user do |post|
      link_to post.user.name, admin_user_path(post.user)
    end
    column :comments_count
    column :created_at
    column :updated_at
    actions
  end
end
