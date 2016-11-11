ActiveAdmin.register Comment do

  permit_params :content, :user_id, :post_id

  index do
    id_column
    column :content
    column :user do |comment|
      link_to comment.user.name, admin_user_path(comment.user)
    end
    column :created_at
    column :updated_at
    actions
  end
end
