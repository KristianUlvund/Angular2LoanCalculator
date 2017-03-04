using Angular2Individuell.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Angular2Individuell
{
    public class DB
    {
        /// <summary>
        ///     Denne funksjonen lager et nytt consumer objekt og lagrer det i databasen.
        /// </summary>
        /// <param name="inInformation">
        ///     Consumer objekt
        /// </param>
        /// <returns>
        ///     true visst alt er OK, false ellers
        /// </returns>
        public bool createLoan(DomeneConsumer inInformation)
        {
            using (var db = new ModelContext())
            {
                if (db.Consumers.Find(inInformation.personalIdentification) != null)
                {
                    return false;
                }
                else
                {
                    var newConsumerLoan = new Consumer
                    {
                        personalIdentification = inInformation.personalIdentification,
                        email = inInformation.email,
                        phonenumber = inInformation.phonenumber,
                        duration = inInformation.duration,
                        amount = inInformation.amount
                    };

                    try
                    {
                        db.Consumers.Add(newConsumerLoan);
                        db.SaveChanges();
                    }
                    catch (Exception error)
                    {
                        return false;
                    }
                    return true;
                }
            }  
        }

        /// <summary>
        ///     Denne funksjonen lager en liste med consumers
        /// </summary>
        /// <returns>
        ///     Liste med consumes, null om ingen eksisterer
        /// </returns>
        public List<DomeneConsumer> allConsumers()
        {
            using (var db = new ModelContext())
            {
                try
                {
                    List<DomeneConsumer> consumers = db.Consumers.Select(c => new DomeneConsumer()
                    {
                        personalIdentification = c.personalIdentification,
                        email = c.email,
                        phonenumber = c.phonenumber,
                        duration = c.duration,
                        amount = c.amount
                    }).ToList();

                    if(consumers != null)
                    {
                        return consumers;
                    }
                    else
                    {
                        return null;
                    }
                }
                catch (Exception error)
                {
                    return null;
                }
            }   
        }
    }
}