class CreateDiagrams < ActiveRecord::Migration
  def self.up
    create_table :diagrams do |t|
      t.string :title
      t.text :content
      t.string :cookie

      t.timestamps
    end
  end

  def self.down
    drop_table :diagrams
  end
end
