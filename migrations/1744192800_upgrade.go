package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		tracer := NewTracer("(v0.3)1744192800")
		tracer.Printf("go ...")

		// update collection `access`
		{
			collection, err := app.FindCollectionByNameOrId("4yzbv8urny5ja1e")
			if err != nil {
				return err
			}

			if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
				"hidden": false,
				"id": "hwy7m03o",
				"maxSelect": 1,
				"name": "provider",
				"presentable": false,
				"required": false,
				"system": false,
				"type": "select",
				"values": [
					"1panel",
					"acmehttpreq",
					"akamai",
					"aliyun",
					"aws",
					"azure",
					"baiducloud",
					"baishan",
					"baotapanel",
					"byteplus",
					"buypass",
					"cachefly",
					"cdnfly",
					"cloudflare",
					"cloudns",
					"cmcccloud",
					"ctcccloud",
					"cucccloud",
					"desec",
					"dnsla",
					"dogecloud",
					"dynv6",
					"edgio",
					"fastly",
					"gname",
					"gcore",
					"godaddy",
					"goedge",
					"googletrustservices",
					"huaweicloud",
					"jdcloud",
					"k8s",
					"letsencrypt",
					"letsencryptstaging",
					"local",
					"namecheap",
					"namedotcom",
					"namesilo",
					"ns1",
					"porkbun",
					"powerdns",
					"qiniu",
					"qingcloud",
					"rainyun",
					"safeline",
					"ssh",
					"sslcom",
					"tencentcloud",
					"ucloud",
					"upyun",
					"vercel",
					"volcengine",
					"wangsu",
					"webhook",
					"westcn",
					"zerossl"
				]
			}`)); err != nil {
				return err
			}

			if err := app.Save(collection); err != nil {
				return nil
			}

			tracer.Printf("collection '%s' updated", collection.Name)
		}

		tracer.Printf("done")
		return nil
	}, func(app core.App) error {
		return nil
	})
}
