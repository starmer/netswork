class AddSharedColumn < ActiveRecord::Migration
  def self.up
    add_column :diagrams, :shared, :boolean, :default => false
  end

  def self.down
    remove_column :diagrams, :shared
  end
end
