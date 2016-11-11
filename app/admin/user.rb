ActiveAdmin.register User do
  permit_params :name, :email, :user

  filter :name
  filter :email
  filter :created_at
  filter :updated_at
  index do
    id_column
    column :name
    column "Email" do |user| mail_to user.email end
    column :created_at
    column :updated_at
    actions
  end
end
