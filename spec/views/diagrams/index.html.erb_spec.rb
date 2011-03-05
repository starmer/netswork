require 'spec_helper'

describe "diagrams/index.html.erb" do
  before(:each) do
    assign(:diagrams, [
      stub_model(Diagram,
        :title => "Title",
        :content => "MyText",
        :cookie => "Cookie"
      ),
      stub_model(Diagram,
        :title => "Title",
        :content => "MyText",
        :cookie => "Cookie"
      )
    ])
  end

  it "renders a list of diagrams" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Cookie".to_s, :count => 2
  end
end
