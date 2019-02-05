import React, { Component } from 'react';
import CompanyCard from './CompanyCard';
import JobCard from './JobCard';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import JoblyApi from './JoblyApi';

const ResourceListContainer = styled.div`
  top: 25vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  top: 12vw;
  width: 65vw;
  position: relative;
`;

class ResourceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
      displayed: []
    };
    this.searchResources = this.searchResources.bind(this);
    this.infiniteScroll = this.infiniteScroll.bind(this);
    this.populateResources = this.populateResources.bind(this);
  }

  async populateResources(resourceType, displayedSize = this.props.pageSize) {
    let allResources = await JoblyApi.request(`${resourceType}/`);
    allResources[resourceType] = allResources[resourceType].map(resource => {
      resource.identifier = resource.handle || resource.id;
      return resource;
    });
    this.setState({
      resources: allResources[resourceType],
      displayed: allResources[resourceType].slice(0, displayedSize)
    });
  }

  async infiniteScroll() {
    if (document.body.scrollHeight - window.innerHeight - window.scrollY < 50) {
      const length = this.state.displayed.length;
      const { resourceType, pageSize } = this.props;
      this.populateResources(resourceType, length + pageSize);
    }
  }
  async componentDidMount() {
    const { resourceType } = this.props;
    this.populateResources(resourceType);
    window.addEventListener('scroll', this.infiniteScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll);
  }

  // This logic is needed when changing context _e.g._ from job to company
  async componentDidUpdate(prevProps) {
    const prevType = prevProps.resourceType;
    const { resourceType } = this.props;
    if (resourceType !== prevType) {
      this.populateResources(resourceType);
    }
  }

  // Handles AJAX get to the API based off of search parameters
  async searchResources(queryString) {
    const { resourceType } = this.props;
    const apiResponse = await JoblyApi.request(`${resourceType}/`, {
      search: queryString
    });
    this.setState({ resources: apiResponse[resourceType] });
  }

  // Renders the appropriate resource card based off of the resourceType prop
  renderResources() {
    const { resourceType } = this.props;
    return this.state.displayed.map(resource => {
      if (resourceType === 'companies') {
        return <CompanyCard key={resource.identifier} info={resource} />;
      } else if (resourceType === 'jobs') {
        return (
          <JobCard
            key={resource.id}
            info={resource}
            id={resource.id}
            isApplied={this.props.appliedSet.has(resource.id)}
            applyToJob={this.props.applyToJob}
          />
        );
      } else return <p>Unhandled Resource</p>;
    });
  }

  render() {
    return (
      <ResourceListContainer onScroll={this.infiniteScroll}>
        <SearchBar onSearch={this.searchResources} />
        <SearchResultsContainer>
          {this.renderResources()}
        </SearchResultsContainer>
      </ResourceListContainer>
    );
  }
}

ResourceList.defaultProps = {
  pageSize: 20
};

export default ResourceList;
