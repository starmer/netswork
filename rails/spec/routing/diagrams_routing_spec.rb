require "spec_helper"

describe DiagramsController do
  describe "routing" do

    it "recognizes and generates #index" do
      { :get => "/diagrams" }.should route_to(:controller => "diagrams", :action => "index")
    end

    it "recognizes and generates #new" do
      { :get => "/diagrams/new" }.should route_to(:controller => "diagrams", :action => "new")
    end

    it "recognizes and generates #show" do
      { :get => "/diagrams/1" }.should route_to(:controller => "diagrams", :action => "show", :id => "1")
    end

    it "recognizes and generates #edit" do
      { :get => "/diagrams/1/edit" }.should route_to(:controller => "diagrams", :action => "edit", :id => "1")
    end

    it "recognizes and generates #create" do
      { :post => "/diagrams" }.should route_to(:controller => "diagrams", :action => "create")
    end

    it "recognizes and generates #update" do
      { :put => "/diagrams/1" }.should route_to(:controller => "diagrams", :action => "update", :id => "1")
    end

    it "recognizes and generates #destroy" do
      { :delete => "/diagrams/1" }.should route_to(:controller => "diagrams", :action => "destroy", :id => "1")
    end

  end
end
