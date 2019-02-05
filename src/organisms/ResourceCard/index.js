import React, { PureComponent, createContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 150px;
  width: 100%;
  background-color: white;
  margin: 10px 0px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.22), 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.5);
  }
`;

const JobTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 20px;
  width: 100%;
  color: rgba(0, 0, 0, 0.75);
`;

const TitleP = styled.p`
  font-weight: 600;
  padding: 0;
  margin-top: 20px;
`;

const DetailP = styled.p`
  margin: 2px 0;
  padding: 0;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: auto;
  min-width: 150px;
  width: 150px;
  padding: 20px;
`;

const StyledButton = styled.button`
  font-size: 120%;
  font-weight: bold;
  border: none;
  background-color: rgb(220, 53, 69);
  color: white;
  border-radius: 5px;
  padding: 10px 15px;
  transition: background-color 0.75s;

  &:hover {
    background-color: #4682b4;
    cursor: pointer;
  }

  &:disabled {
    background-color: gray;
  }
`;

const context = createContext({ info: {}, isApplied: false });

class ResourceCard extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.props.applyToJob.bind(this, this.props.id);
  }

  static ApplyButton = class ApplyButton extends PureComponent {
    render() {
      return (
        <context.Consumer>
          {({ isApplied }) =>
            isApplied ? (
              <StyledButton disabled>Applied</StyledButton>
            ) : (
              <StyledButton onClick={ResourceCard.handleClick}>
                Apply
              </StyledButton>
            )
          }
        </context.Consumer>
      );
    }
  };

  static Detail = class Detail extends PureComponent {
    render() {
      return (
        <context.Consumer>
          {({ info }) => {
            const string = this.children();
            const value = info[string.toLowerCase().replace(' ', '_')];
            if (value) {
              return (
                <DetailP>
                  {string}: {value}
                </DetailP>
              );
            }
          }}
        </context.Consumer>
      );
    }
  };

  static Title = class Title extends PureComponent {
    render() {
      return (
        <context.Consumer>
          {({ info }) => <TitleP>{info.title || info.name}</TitleP>}
        </context.Consumer>
      );
    }
  };

  static Link = class Link extends PureComponent {
    render() {
      return (
        <context.Consumer>
          {({ resourceType, info }) => (
            <Link to={`${resourceType}/${info.handle || info.id}`} />
          )}
        </context.Consumer>
      );
    }
  };

  render() {
    // const { id, title, salary, equity, company_handle } = this.props.info;
    const { info, isApplied, resourceType } = this.props;
    return (
      <context.Provider value={{ isApplied, info, resourceType }}>
        <StyledCard>
          <ResourceCard.Link>
            <JobTextContainer>
              <ResourceCard.Detail>Salary</ResourceCard.Detail>
              <ResourceCard.Detail>Equity</ResourceCard.Detail>
              <ResourceCard.Detail>Company</ResourceCard.Detail>
            </JobTextContainer>
          </ResourceCard.Link>
          <StyledButtonContainer>
            <ResourceCard.ApplyButton />
          </StyledButtonContainer>
        </StyledCard>
      </context.Provider>
    );
  }
}

const stringOrNumber = [PropTypes.string, PropTypes.number];

ResourceCard.propTypes = {
  info: PropTypes.objectOf(PropTypes.oneOfType(stringOrNumber)).isRequired,
  appliedSet: PropTypes.object,
  isApplied: PropTypes.bool,
  resourceType: PropTypes.string.isRequired,
  key: PropTypes.oneOfType(stringOrNumber)
};

ResourceCard.defaultProps = {
  // isApplied={this.props.appliedSet.has(job.id)}
  // applyToJob={this.props.applyToJob}
  // key={job.id}
  // info={job}
};

export default ResourceCard;
