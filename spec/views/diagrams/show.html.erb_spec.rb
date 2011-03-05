require 'spec_helper'

describe "diagrams/show.html.erb" do
  before(:each) do
    @diagram = assign(:diagram, stub_model(Diagram,
      :title => "Title",
      :content => "MyText",
      :cookie => "Cookie"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Title/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/MyText/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Cookie/)
  end
end
