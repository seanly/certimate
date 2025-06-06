package baishan

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"reflect"
	"strings"
	"time"

	"github.com/go-resty/resty/v2"
)

type Client struct {
	client *resty.Client
}

func NewClient(apiToken string) *Client {
	client := resty.New().
		SetBaseURL("https://cdn.api.baishan.com").
		SetHeader("User-Agent", "certimate").
		SetHeader("Token", apiToken)

	return &Client{
		client: client,
	}
}

func (c *Client) WithTimeout(timeout time.Duration) *Client {
	c.client.SetTimeout(timeout)
	return c
}

func (c *Client) sendRequest(method string, path string, params interface{}) (*resty.Response, error) {
	req := c.client.R()
	if strings.EqualFold(method, http.MethodGet) {
		qs := url.Values{}
		if params != nil {
			temp := make(map[string]any)
			jsonb, _ := json.Marshal(params)
			json.Unmarshal(jsonb, &temp)
			for k, v := range temp {
				if v != nil {
					rv := reflect.ValueOf(v)
					switch rv.Kind() {
					case reflect.Slice, reflect.Array:
						for i := 0; i < rv.Len(); i++ {
							qs.Add(fmt.Sprintf("%s[]", k), fmt.Sprintf("%v", rv.Index(i).Interface()))
						}
					case reflect.Map:
						for _, rk := range rv.MapKeys() {
							qs.Add(fmt.Sprintf("%s[%s]", k, rk.Interface()), fmt.Sprintf("%v", rv.MapIndex(rk).Interface()))
						}
					default:
						qs.Set(k, fmt.Sprintf("%v", v))
					}
				}
			}
		}

		req = req.SetQueryParamsFromValues(qs)
	} else {
		req = req.SetHeader("Content-Type", "application/json").SetBody(params)
	}

	resp, err := req.Execute(method, path)
	if err != nil {
		return resp, fmt.Errorf("baishan api error: failed to send request: %w", err)
	} else if resp.IsError() {
		return resp, fmt.Errorf("baishan api error: unexpected status code: %d, resp: %s", resp.StatusCode(), resp.String())
	}

	return resp, nil
}

func (c *Client) sendRequestWithResult(method string, path string, params interface{}, result BaseResponse) error {
	resp, err := c.sendRequest(method, path, params)
	if err != nil {
		if resp != nil {
			json.Unmarshal(resp.Body(), &result)
		}
		return err
	}

	if err := json.Unmarshal(resp.Body(), &result); err != nil {
		return fmt.Errorf("baishan api error: failed to unmarshal response: %w", err)
	} else if errcode := result.GetCode(); errcode != 0 {
		return fmt.Errorf("baishan api error: code='%d', message='%s'", errcode, result.GetMessage())
	}

	return nil
}
