class RenameTokenToUsers < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :refresh_token, :access_token    
  end
end
