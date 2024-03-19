import { Component } from "react";
import { Header, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.styled";

export class Searchbar extends Component {
    state = {
        value: "",
    }

    handleChange = ({target: {value}}) => {
        this.setState({ value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSearch(this.state.value)
        this.setState({ value: '' });
    }

    render() {

        return (
            <Header >
                <SearchForm onSubmit={this.handleSubmit}>
                    <SearchFormButton type="submit" >
                        <SearchFormButtonLabel >Search</SearchFormButtonLabel>
                    </SearchFormButton>

                    <SearchFormInput
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                </SearchForm>
            </Header>
        )
    }
}