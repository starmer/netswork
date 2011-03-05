require 'spec_helper'

describe "diagrams/new.html.erb" do
  before(:each) do
    assign(:diagram, stub_model(Diagram,
      :title => "MyString",
      :content => "MyText",
      :cookie => "MyString"
    ).as_new_record)
  end

  it "renders new diagram form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => diagrams_path, :method => "post" do
      assert_select "input#diagram_title", :name => "diagram[title]"
      assert_select "textarea#diagram_content", :name => "diagram[content]"
      assert_select "input#diagram_cookie", :name => "diagram[cookie]"
    end
  end
end
